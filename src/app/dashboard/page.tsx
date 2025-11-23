"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface UserInfo {
  token: string;
  name: string;
  provider: string;
}

export default function Dashboard() {
  const searchParams = useSearchParams();
  const [user, setUser] = useState<UserInfo | null>(null);

  const startScrapperAuth = async () => {
    if (user) {
      const provider = searchParams.get("provider") || "facebook";
      try {
        const res = await fetch("/api/app_auth", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            provider: provider,
            token: user.token, // from OAuth flow
          }),
        });

        const data = await res.json();
        if (!data?.app_token) {
          alert("App token not found");
        }
        // localStorage.setItem("app_token", data.app_token);
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

  useEffect(() => {
    const token = searchParams.get("token");
    const name = searchParams.get("name") || "";
    const provider = searchParams.get("provider") || "facebook";

    if (token) {
      setUser({ token, name, provider });
    }
  }, [searchParams]);

  if (!user) return <p className="text-center mt-20">Not signed in</p>;

  return (
    <main className="flex flex-col items-center justify-center h-screen bg-white">
      <h1 className="text-2xl mb-4">Welcome, {user.name || "User"} 👋</h1>
      <p className="mb-4 text-gray-500">Provider: {user.provider}</p>
      <p className="mb-4 text-gray-500">Token: {user.token.slice(0, 10)}...</p>
      <button
        onClick={() => {
          setUser(null);
          window.location.href = "/";
        }}
        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
      >
        Sign Out
      </button>
      <button
        onClick={startScrapperAuth}
        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition my-10"
      >
        Scrape data
      </button>
    </main>
  );
}
