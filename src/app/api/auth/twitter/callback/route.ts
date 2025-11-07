import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const code_verifier = req.cookies.get("code_verifier")?.value;

  if (!code || !code_verifier) {
    return NextResponse.json({ error: "Missing code or code_verifier" }, { status: 400 });
  }

  // Exchange authorization code for access token
  const body = new URLSearchParams({
    grant_type: "authorization_code",
    client_id: process.env.TWITTER_CLIENT_ID!,
    redirect_uri: "http://localhost:3000/api/auth/twitter/callback",
    code,
    code_verifier,
  });

  const response = await fetch("https://api.x.com/2/oauth2/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });

  const data = await response.json();

  if (!response.ok) {
    console.error("Token exchange failed:", data);
    return NextResponse.json({ error: data }, { status: 400 });
  }

  console.log("Twitter Tokens:", data);

  // data = { token_type, expires_in, access_token, scope, refresh_token }
  // Save tokens in DB or session here

  // Redirect to dashboard with token info
  const redirectUrl = new URL("/dashboard", req.url);
  redirectUrl.searchParams.set("token", data.access_token);
  return NextResponse.redirect(redirectUrl);
}
