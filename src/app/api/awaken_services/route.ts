import { NextResponse } from "next/server";

if (process.env.NODE_ENV === "production") {
  // Prevent running in production
  throw new Error("Awaken services is a dev-only route!");
}

// List of service URLs
const SERVICES = [
  `${process.env.AUTH_SERVICE}/health`,
  `${process.env.SCRAPPER_SERVICE}/health`,
  `${process.env.PARSER_SERVICE}/health`,
];

export async function GET() {
  try {
    // Call all health endpoints concurrently
    const results = await Promise.all(
      SERVICES.map(async (url) => {
        try {
          const res = await fetch(url);
          if (!res.ok) throw new Error(`Status ${res.status}`);
          return { url, status: "healthy" };
        } catch (err) {
          return { url, status: "unhealthy", error: (err as Error).message };
        }
      })
    );

    return NextResponse.json({
      success: true,
      results,
    });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: (err as Error).message },
      { status: 500 }
    );
  }
}
