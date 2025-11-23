"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface UserInfo {
  token: string;
  name: string;
  provider: string;
}

export default function Dashboard() {
  const searchParams = useSearchParams();
  const [user, setUser] = useState<UserInfo | null>(null);
  const [loadingDev, setLoadingDev] = useState(false);

  const startScrapperAuth = async () => {
    if (user) {
      const provider = searchParams.get("provider") || "facebook";
      try {
        const res = await fetch("/api/app_auth", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            provider: provider,
            token: user.token,
          }),
        });

        const data = await res.json();
        if (!data?.app_token) {
          alert("App token not found");
        }
        continueScrapping(data?.app_token);
      } catch (e) {
        alert("Error: " + String(e));
      }
    } else {
      alert("No user found");
    }
  };

  const continueScrapping = async (token: string) => {
    try {
      const res = await fetch("/api/scrape", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          app_token: token,
        }),
      });

      const data = await res.json();
      console.log(data);
    } catch (e) {
      alert("Error: " + String(e));
    }
  };

  // Dev-only: awaken all services
  const awakenAllServices = async () => {
    setLoadingDev(true);
    try {
      const res = await fetch("/api/awaken_services");
      const data = await res.json();
      alert("All services awakened successfully!");
      console.log(data);
    } catch (e) {
      alert("Error awakening services: " + String(e));
    } finally {
      setLoadingDev(false);
    }
  };

  useEffect(() => {
    const token = searchParams.get("token");
    const name = searchParams.get("name") || "";
    const provider = searchParams.get("provider") || "facebook";

    if (token) {
      setUser({ token, name, provider });
    }
  }, [searchParams]);

  if (!user)
    return (
      <main className="min-h-screen flex flex-col items-center justify-center bg-linear-to-br from-slate-50 to-slate-200 px-4">
        <div className="text-center max-w-md">
          <h2 className="text-2xl font-semibold text-slate-800 mb-2">
            You are not signed in
          </h2>
          <p className="text-slate-500 mb-6 text-sm">
            Please log in using Facebook or Twitter to access your dashboard.
          </p>

          <a
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-md transition"
          >
            Go to Login
          </a>
        </div>
      </main>
    );

  return (
    <main className="min-h-screen bg-linear-to-br from-slate-50 to-slate-200 flex items-center justify-center px-4">
      <Card className="w-full max-w-lg shadow-xl rounded-2xl border border-slate-200">
        <CardHeader className="text-center pb-2">
          <CardTitle className="text-3xl font-bold text-slate-800">
            Dashboard
          </CardTitle>
          <p className="text-slate-500 text-sm mt-1">
            Welcome back to Social Scrapper 👋
          </p>
        </CardHeader>

        <Separator />

        <CardContent className="mt-6 space-y-6">
          {/* User Summary */}
          <div className="text-center space-y-1">
            <h2 className="text-xl font-semibold text-slate-800">
              Hello, {user.name || "User"}
            </h2>

            <Badge variant="secondary" className="text-slate-700">
              Logged in via {user.provider}
            </Badge>
          </div>

          <Separator />

          {/* Action Buttons */}
          <div className="flex flex-col gap-4">
            {/* Dev-only button */}
            {process.env.NODE_ENV !== "production" && (
              <Button
                onClick={awakenAllServices}
                className="w-full py-4 text-sm font-medium shadow-sm bg-yellow-500 hover:bg-yellow-600 text-white"
                disabled={loadingDev}
              >
                {loadingDev ? "Awakening..." : "Awaken All Services (Dev Only)"}
              </Button>
            )}

            <Button
              onClick={startScrapperAuth}
              className="w-full py-5 text-base font-medium shadow-sm bg-blue-600 hover:bg-blue-700 text-white"
            >
              🚀 Start Scraping
            </Button>

            <Button
              onClick={() => {
                setUser(null);
                window.location.href = "/";
              }}
              variant="destructive"
              className="w-full py-5 text-base shadow-sm"
            >
              Sign Out
            </Button>
          </div>

          <Separator />

          <p className="text-xs text-center text-slate-500">
            Your data is processed securely. Tokens are never stored locally.
          </p>
        </CardContent>
      </Card>
    </main>
  );
}
