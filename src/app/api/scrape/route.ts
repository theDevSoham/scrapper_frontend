import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // Parse incoming JSON
    const body = await req.json();
    const { app_token } = body;

    if (!app_token) {
      return NextResponse.json({ error: "Missing app_token" }, { status: 400 });
    }

    // Forward request to your backend
    const response = await fetch(`${process.env.SCRAPPER_SERVICE}/scrape`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ app_token }),
    });

    // Try to parse the backend response as JSON, fallback to text
    const data =
      (await response.json().catch(async () => await response.text())) || {};

    if (!response.ok) {
      return NextResponse.json(
        { error: data || "Scrape request failed" },
        { status: response.status }
      );
    }

    // Return backend response to frontend
    return NextResponse.json(data);
  } catch (err) {
    console.error("Error in /api/scrape:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
