import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

const TWITTER_CLIENT_ID = process.env.TWITTER_CLIENT_ID!;
const REDIRECT_URI = process.env.TWITTER_REDIRECT_URI!;
const TWITTER_AUTH_URL = "https://x.com/i/oauth2/authorize";
const SCOPE = ["users.email", "tweet.read", "users.read", "offline.access"];

export async function GET() {
  // 1️⃣ Generate PKCE code_verifier + code_challenge
  const code_verifier = crypto.randomBytes(64).toString("base64url");
  const code_challenge = crypto
    .createHash("sha256")
    .update(code_verifier)
    .digest("base64url");

  // 2️⃣ Store code_verifier in cookie (so we can retrieve later)
  const response = NextResponse.redirect(
    `${TWITTER_AUTH_URL}?response_type=code&client_id=${TWITTER_CLIENT_ID}&redirect_uri=${encodeURIComponent(
      REDIRECT_URI
    )}&scope=${encodeURIComponent(
      SCOPE.join(" ")
    )}&state=secureRandomState&code_challenge=${code_challenge}&code_challenge_method=S256`
  );

  response.cookies.set("code_verifier", code_verifier, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
  });

  return response;
}
