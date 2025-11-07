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

  useEffect(() => {
    const token = searchParams.get("token");
    const name = searchParams.get("name") || "";
    const provider = searchParams.get("provider") || "twitter"; // default twitter

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
    </main>
  );
}
