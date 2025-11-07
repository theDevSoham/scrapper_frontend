import { NextRequest, NextResponse } from "next/server";

const FACEBOOK_CLIENT_ID = process.env.FACEBOOK_CLIENT_ID!;
const FACEBOOK_CLIENT_SECRET = process.env.FACEBOOK_CLIENT_SECRET!;
const REDIRECT_URI = process.env.FACEBOOK_REDIRECT_URI!;

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const savedState = req.cookies.get("fb_state")?.value;

  if (!code || state !== savedState) {
    return NextResponse.json(
      { error: "Invalid code or state" },
      { status: 400 }
    );
  }

  // Exchange code for access token
  const tokenRes = await fetch(
    `https://graph.facebook.com/v23.0/oauth/access_token?client_id=${FACEBOOK_CLIENT_ID}&redirect_uri=${encodeURIComponent(
      REDIRECT_URI
    )}&client_secret=${FACEBOOK_CLIENT_SECRET}&code=${code}`
  );

  const tokenData = await tokenRes.json();

  if (!tokenRes.ok) {
    return NextResponse.json({ error: tokenData }, { status: 400 });
  }

  const accessToken = tokenData.access_token;

  // Fetch user info
  const userRes = await fetch(
    `https://graph.facebook.com/me?fields=id,name,email,picture&access_token=${accessToken}`
  );

  const userData = await userRes.json();

  // Redirect to dashboard with token info
  const redirectUrl = new URL("/dashboard", req.url);
  redirectUrl.searchParams.set("token", accessToken);
  redirectUrl.searchParams.set("name", userData.name);
  redirectUrl.searchParams.set("provider", "facebook");

  return NextResponse.redirect(redirectUrl);
}
