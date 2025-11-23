import AuthButtons from "@/components/AuthButtons";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

export default function Home() {
  return (
    <main className="min-h-screen w-full flex items-center justify-center bg-linear-to-br from-slate-50 via-white to-slate-200 px-4">
      <Card className="w-full max-w-lg shadow-xl border border-slate-200 rounded-2xl backdrop-blur-sm">
        <CardHeader className="text-center pb-2">
          <CardTitle className="text-3xl font-bold text-slate-800">
            Social Scrapper MVP
          </CardTitle>
          <CardDescription className="text-slate-600 mt-1">
            Extract public profile insights from multiple social platforms.
          </CardDescription>
        </CardHeader>

        <CardContent className="pt-4">
          {/* Feature Highlights */}
          <div className="mb-6 space-y-3 text-slate-700 text-sm">
            <p className="text-center font-medium text-slate-800">
              🚀 What you can do with Social Scrapper:
            </p>

            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <span>✔️</span>
                <span>Scrape social profile metadata in real-time</span>
              </li>
              <li className="flex items-start gap-2">
                <span>✔️</span>
                <span>Analyze engagement metrics & follower counts</span>
              </li>
              <li className="flex items-start gap-2">
                <span>✔️</span>
                <span>
                  Export structured insights for marketing or research
                </span>
              </li>
            </ul>
          </div>

          {/* Auth Buttons */}
          <div className="flex flex-col items-center">
            <AuthButtons />
          </div>

          {/* Footer Note */}
          <p className="text-xs text-center text-slate-500 mt-6">
            We never store passwords. Authentication is powered securely by
            OAuth.
          </p>
        </CardContent>
      </Card>
    </main>
  );
}
