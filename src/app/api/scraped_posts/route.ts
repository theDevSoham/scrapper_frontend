// app/api/scraped_posts/route.ts
import { NextRequest, NextResponse } from "next/server";

interface AuthorRaw {
  provider: string;
  social_id: string;
  social_token: string;
  name: string;
  email: string;
  sub?: string | null;
}

interface Author {
  id: string | null;
  username: string;
  name: string;
  profile_url: string | null;
  raw: AuthorRaw;
}

interface Media {
  type: string;
  url: string | null;
  meta: Record<string, unknown>;
}

interface Metrics {
  likes: number;
  shares: number;
  comments: number;
  quotes: number;
  views: number;
}

interface ProvenanceRaw {
  id: string;
  text: string | null;
  created_at: string | null;
  public_metrics: Record<string, unknown>;
  edit_history_tweet_ids: string[];
}

interface Provenance {
  raw: ProvenanceRaw;
  adapter_version: string;
}

export interface ScrapedPost {
  canonical_hash: string;
  author: Author;
  comments: unknown[];
  content_text: string | null;
  created_at: string;
  fetched_at: string;
  media: Media[];
  metrics: Metrics;
  post_id: string;
  provenance: Provenance;
  provider: string;
  reactions: unknown[];
  schema_version: number;
  tags: string[];
  updated_at: string;
  url: string;
}

export interface ScrapedPostsResponse {
  count: number;
  posts: ScrapedPost[];
}

export async function POST(req: NextRequest) {
  try {
    const { page = 1, limit = 10, token } = await req.json();

    if (!token) {
      return NextResponse.json({ error: "Missing token" }, { status: 400 });
    }

    const res = await fetch(`${process.env.ANALYZER_SERVICE}/unanalyzed`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    });

    if (!res.ok) {
      const text = await res.text();
      return NextResponse.json(
        { error: "Failed to fetch posts", details: text },
        { status: res.status }
      );
    }

    const data: ScrapedPostsResponse = await res.json();

    // Pagination logic
    const pageNum = Number(page);
    const pageSize = Number(limit);
    const start = (pageNum - 1) * pageSize;
    const end = start + pageSize;
    const paginatedPosts = data.posts.slice(start, end);

    return NextResponse.json({
      count: data.count,
      page: pageNum,
      limit: pageSize,
      total_pages: Math.ceil(data.count / pageSize),
      posts: paginatedPosts,
    });
  } catch (error) {
    console.error("Error fetching scraped posts:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
