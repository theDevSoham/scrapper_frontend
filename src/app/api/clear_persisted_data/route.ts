// app/api/clear_persisted_data/route.ts
import { NextRequest, NextResponse } from "next/server";
import { MongoClient } from "mongodb";
import Redis from "ioredis";

export async function GET(req: NextRequest) {
  // MongoDB
  const mongoUri = process.env.DATABASE_URI;
  if (!mongoUri) {
    return NextResponse.json(
      { error: "Missing DATABASE_URI in environment" },
      { status: 500 }
    );
  }

  let mongoClient: MongoClient | null = null;
  let redisClient: Redis | null = null;

  try {
    // Connect to MongoDB
    mongoClient = new MongoClient(mongoUri);
    await mongoClient.connect();
    const db = mongoClient.db("scrapper_db");
    const postsCollection = db.collection("posts");

    // Delete all documents in 'posts'
    const mongoResult = await postsCollection.deleteMany({});

    // Connect to Redis
    const redisUrl = process.env.VALKEY_URL;
    if (!redisUrl) {
      return NextResponse.json(
        { error: "Missing VALKEY_URL in environment" },
        { status: 500 }
      );
    }

    redisClient = new Redis(redisUrl);

    // Flush all keys in Redis
    const redisResult = await redisClient.flushall();

    return NextResponse.json({
      message: "MongoDB 'posts' collection cleared and Redis cache flushed",
      mongoDeletedCount: mongoResult.deletedCount,
      redisResult,
    });
  } catch (error) {
    console.error("Error clearing persisted data:", error);
    return NextResponse.json(
      { error: "Failed to clear persisted data", details: String(error) },
      { status: 500 }
    );
  } finally {
    if (mongoClient) await mongoClient.close();
    if (redisClient) await redisClient.quit();
  }
}
