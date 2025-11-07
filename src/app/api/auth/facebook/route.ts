import { NextResponse } from "next/server";
import crypto from "crypto"

const FACEBOOK_CLIENT_ID = process.env.FACEBOOK_CLIENT_ID!;
const REDIRECT_URI = process.env.FACEBOOK_REDIRECT_URI!;
const FACEBOOK_AUTH_URL = "https://www.facebook.com/v23.0/dialog/oauth";
const SCOPE = ["email", "public_profile"]

export async function GET() {
  const state = crypto.randomBytes(16).toString("hex");

  const authUrl = `${FACEBOOK_AUTH_URL}?client_id=${FACEBOOK_CLIENT_ID}&redirect_uri=${encodeURIComponent(
    REDIRECT_URI
  )}&state=${state}&scope=${SCOPE.join(",")}`;

  const response = NextResponse.redirect(authUrl);
  response.cookies.set("fb_state", state, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
  });

  return response;
}
