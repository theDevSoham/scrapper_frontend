"use client";

import { FaFacebook, FaTwitter } from "react-icons/fa";

export default function AuthButtons() {
  return (
    <div className="flex flex-col gap-4 w-full max-w-xs">
      <button
        onClick={() => {
          window.location.href = "/api/auth/facebook";
        }}
        className="flex items-center justify-center gap-2 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
      >
        <FaFacebook /> Continue with Facebook
      </button>

      <button
        onClick={() => {
          window.location.href = "/api/auth/twitter";
        }}
        className="flex items-center justify-center gap-2 bg-sky-500 text-white py-2 px-4 rounded-lg hover:bg-sky-600 transition"
      >
        <FaTwitter /> Continue with Twitter
      </button>
    </div>
  );
}
