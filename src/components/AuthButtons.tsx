"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  FaFacebook,
  FaTwitter,
  // FaGoogle,
  // FaLinkedin,
  // FaGithub,
} from "react-icons/fa";
import { Loader2 } from "lucide-react";

export default function AuthButtons() {
  const [loading, setLoading] = useState<string | null>(null);

  const handleLogin = (provider: string) => {
    setLoading(provider);
    window.location.href = `/api/auth/${provider}`;
  };

  return (
    <div className="flex flex-col gap-4 w-full max-w-sm mx-auto">
      {/* Facebook */}
      <Button
        onClick={() => handleLogin("facebook")}
        className="w-full flex items-center gap-2 bg-[#1877F2] hover:bg-[#166FE0] text-white font-medium shadow-sm py-5 text-base"
        disabled={loading !== null}
      >
        {loading === "facebook" ? (
          <Loader2 className="animate-spin w-5 h-5" />
        ) : (
          <FaFacebook className="text-lg" />
        )}
        Continue with Facebook
      </Button>

      {/* Twitter */}
      <Button
        onClick={() => handleLogin("twitter")}
        className="w-full flex items-center gap-2 bg-[#1DA1F2] hover:bg-[#0D8BD9] text-white font-medium shadow-sm py-5 text-base"
        disabled={loading !== null}
      >
        {loading === "twitter" ? (
          <Loader2 className="animate-spin w-5 h-5" />
        ) : (
          <FaTwitter className="text-lg" />
        )}
        Continue with Twitter
      </Button>

      {/* Google */}
      {/* <Button
        onClick={() => handleLogin("google")}
        className="w-full flex items-center gap-2 bg-white text-slate-800 border border-slate-300 hover:bg-slate-100 font-medium shadow-sm py-5 text-base"
        disabled={loading !== null}
      >
        {loading === "google" ? (
          <Loader2 className="animate-spin w-5 h-5" />
        ) : (
          <FaGoogle className="text-lg text-red-500" />
        )}
        Continue with Google
      </Button> */}

      {/* LinkedIn */}
      {/* <Button
        onClick={() => handleLogin("linkedin")}
        className="w-full flex items-center gap-2 bg-[#0A66C2] hover:bg-[#0959A7] text-white font-medium shadow-sm py-5 text-base"
        disabled={loading !== null}
      >
        {loading === "linkedin" ? (
          <Loader2 className="animate-spin w-5 h-5" />
        ) : (
          <FaLinkedin className="text-lg" />
        )}
        Continue with LinkedIn
      </Button> */}

      {/* GitHub */}
      {/* <Button
        onClick={() => handleLogin("github")}
        className="w-full flex items-center gap-2 bg-black hover:bg-[#111] text-white font-medium shadow-sm py-5 text-base"
        disabled={loading !== null}
      >
        {loading === "github" ? (
          <Loader2 className="animate-spin w-5 h-5" />
        ) : (
          <FaGithub className="text-lg" />
        )}
        Continue with GitHub
      </Button> */}
    </div>
  );
}
