import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

// Your Facebook App Secret
const FACEBOOK_APP_SECRET =
  process.env.FACEBOOK_APP_SECRET || "YOUR_APP_SECRET";

const AUTH_SERVICE = process.env.AUTH_SERVICE || "";

/**
 * Decode Facebook signed_request
 * Returns the payload if valid, otherwise null
 */
function decodeSignedRequest(signedRequest: string) {
  const [encodedSig, payload] = signedRequest.split(".");

  const sig = Buffer.from(encodedSig, "base64url");
  const data = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));

  // Verify signature
  const expectedSig = crypto
    .createHmac("sha256", FACEBOOK_APP_SECRET)
    .update(payload)
    .digest();

  if (!crypto.timingSafeEqual(sig, expectedSig)) {
    console.error("Invalid signed request");
    return null;
  }

  return data;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body.signed_request) {
      return NextResponse.json(
        { error: "Missing signed_request" },
        { status: 400 }
      );
    }

    const data = decodeSignedRequest(body.signed_request);
    if (!data) {
      return NextResponse.json(
        { error: "Invalid signed_request" },
        { status: 400 }
      );
    }

    const facebookUserId = data.user_id;

    const resp = await fetch(
      `${AUTH_SERVICE}/delete_user_by_id`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: facebookUserId,
          provider: "facebook",
          confirm: true,
        }),
      }
    );
    // Example:
    // await db.user.delete({ where: { facebookId: facebookUserId } });

    console.log(`Received deletion request for user ${facebookUserId}`);

    // Response according to Facebook's requirements
    return NextResponse.json({
      url: `${AUTH_SERVICE}/get_user`, // Optional: redirect page
      confirmation_code: crypto.randomBytes(16).toString("hex"),
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
