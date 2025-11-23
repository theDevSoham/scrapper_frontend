"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Loader2 } from "lucide-react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
} from "@/components/ui/table";

interface UserInfo {
  token: string;
  name: string;
  provider: string;
}

interface ScrapedPost {
  post_id: string;
  url: string;
  author: { name: string; username: string };
  created_at: string;
  provider: string;
}

export default function Dashboard() {
  const searchParams = useSearchParams();
  const [user, setUser] = useState<UserInfo | null>(null);
  const [loadingScrape, setLoadingScrape] = useState(false);
  const [loadingPosts, setLoadingPosts] = useState(false);
  const [scrapedPosts, setScrapedPosts] = useState<ScrapedPost[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loadingDev, setLoadingDev] = useState(false);
  const [appToken, setAppToken] = useState<string>("");

  const startScrapperAuth = async () => {
    if (!user) return alert("No user found");

    setLoadingScrape(true);
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
        setLoadingScrape(false);
        return;
      }

      setAppToken(data?.app_token || "");
      continueScrapping(data?.app_token);
    } catch (e) {
      alert("Error: " + String(e));
      setLoadingScrape(false);
    }
  };

  const continueScrapping = async (token: string) => {
    try {
      const res = await fetch("/api/scrape", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ app_token: token }),
      });

      const data = await res.json();
      console.log(data);
    } catch (e) {
      alert("Error: " + String(e));
    } finally {
      setLoadingScrape(false);
    }
  };

  const getScrapedPosts = async (pageNum = 1, limit = 10) => {
    if (!user) return console.log("No user found");
    if (!appToken) return alert("No app token found");

    setLoadingPosts(true);
    try {
      const res = await fetch("/api/scraped_posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${appToken}`,
        },
        body: JSON.stringify({ page: pageNum, limit, token: appToken }),
      });

      const data = await res.json();
      setScrapedPosts(data.posts || []);
      setPage(data.page || 1);
      setTotalPages(data.total_pages || 1);
    } catch (e) {
      alert("Error fetching posts: " + String(e));
    } finally {
      setLoadingPosts(false);
    }
  };

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
      getScrapedPosts(); // fetch first page by default
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
    <main className="min-h-screen bg-linear-to-br from-slate-50 to-slate-200 flex flex-col items-center justify-start px-4 py-10 gap-6">
      <Card className="w-full max-w-6xl shadow-xl rounded-2xl border border-slate-200">
        <CardHeader className="text-center pb-2">
          <CardTitle className="text-3xl font-bold text-slate-800">
            Dashboard
          </CardTitle>
          <p className="text-slate-500 text-sm mt-1">
            Welcome back to Social Scrapper 👋
          </p>
        </CardHeader>

        <Separator />

        <CardContent className="space-y-6">
          {/* User Summary */}
          <div className="text-center space-y-1">
            <h2 className="text-xl font-semibold text-slate-800">
              Hello, {user.name || "User"}
            </h2>
            <Badge variant="secondary" className="text-slate-700">
              Logged in via {user.provider}
            </Badge>
            <p
              className="text-xs text-slate-500 mt-2 cursor-pointer"
              onClick={() => navigator.clipboard.writeText(user.token)}
            >
              Token: {user.token.slice(0, 12)}...
            </p>
          </div>

          <Separator />

          {/* Action Buttons */}
          <div className="flex flex-col md:flex-row gap-4">
            {/* Dev-only button */}
            {process.env.NODE_ENV !== "production" && (
              <Button
                onClick={awakenAllServices}
                className="flex-1 py-4 text-sm font-medium shadow-sm bg-yellow-500 hover:bg-yellow-600 text-white"
                disabled={loadingDev}
              >
                {loadingDev ? "Awakening..." : "Awaken All Services (Dev Only)"}
              </Button>
            )}
            <Button
              onClick={() => getScrapedPosts(page)}
              className="flex-1 py-5 text-base font-medium shadow-sm bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center gap-2"
              disabled={loadingPosts}
            >
              {loadingPosts && <Loader2 className="animate-spin w-5 h-5" />}
              📥 Get Scraped Posts
            </Button>

            <Button
              onClick={startScrapperAuth}
              className="flex-1 py-5 text-base font-medium shadow-sm bg-green-600 hover:bg-green-700 text-white flex items-center justify-center gap-2"
              disabled={loadingScrape}
            >
              {loadingScrape && <Loader2 className="animate-spin w-5 h-5" />}
              🚀 Start Scraping
            </Button>

            <Button
              onClick={() => {
                setUser(null);
                window.location.href = "/";
              }}
              variant="destructive"
              className="flex-1 py-5 text-base shadow-sm"
            >
              Sign Out
            </Button>
          </div>

          <Separator />

          {/* Scraped Posts Table */}
          {scrapedPosts.length > 0 && (
            <div className="overflow-x-auto">
              <Table className="w-full">
                <TableHeader>
                  <TableRow>
                    <TableHead>Post ID</TableHead>
                    <TableHead>Author</TableHead>
                    <TableHead>Created At</TableHead>
                    <TableHead>Provider</TableHead>
                    <TableHead>URL</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {scrapedPosts.map((post) => (
                    <TableRow key={post.post_id}>
                      <TableCell>{post.post_id}</TableCell>
                      <TableCell>{post.author.name}</TableCell>
                      <TableCell>
                        {new Date(post.created_at).toLocaleString()}
                      </TableCell>
                      <TableCell>{post.provider}</TableCell>
                      <TableCell>
                        <a
                          href={post.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          Link
                        </a>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {/* Pagination */}
              <div className="flex justify-between mt-4">
                <Button
                  onClick={() => page > 1 && getScrapedPosts(page - 1)}
                  disabled={page <= 1}
                >
                  Previous
                </Button>
                <span className="text-sm text-slate-600">
                  Page {page} of {totalPages}
                </span>
                <Button
                  onClick={() => page < totalPages && getScrapedPosts(page + 1)}
                  disabled={page >= totalPages}
                >
                  Next
                </Button>
              </div>
            </div>
          )}

          {scrapedPosts.length === 0 && !loadingPosts && (
            <p className="text-center text-slate-500 text-sm">
              No posts fetched yet.
            </p>
          )}
        </CardContent>
      </Card>
    </main>
  );
}
