import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // Parse the JSON body
    const body = await req.json();
    const { provider, token } = body;

    if (!provider || !token) {
      return NextResponse.json(
        { error: "Missing provider or token" },
        { status: 400 }
      );
    }

    // Forward the request to your backend (Node, Python, etc.)
    const response = await fetch(`${process.env.AUTH_SERVICE}/authenticate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ provider, token }),
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      return NextResponse.json(
        { error: data || "Authentication failed" },
        { status: response.status }
      );
    }

    // Pass the backend response to the frontend
    return NextResponse.json(data);
  } catch (err) {
    console.error("Error in /api/authenticate:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
