import DashboardRenderer from "@/components/DashboardRenderer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { Suspense } from "react";

function LoadingFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-50 to-slate-200 p-6">
      <Card className="w-full max-w-sm shadow-2xl rounded-2xl border border-slate-200">
        <CardHeader className="flex flex-col items-center gap-2 pt-8">
          <div className="relative">
            <span className="absolute -bottom-2 -right-2 inline-flex items-center justify-center h-6 w-6 rounded-full bg-white text-xs shadow">
              <Loader2 className="w-4 h-4 animate-spin text-slate-700" />
            </span>
          </div>

          <CardTitle className="text-lg font-semibold text-slate-900 mt-2">
            Social Scrapper
          </CardTitle>
          <p className="text-sm text-slate-500 text-center px-6">
            Preparing your dashboard — fetching latest insights & warming
            services
          </p>
        </CardHeader>

        <CardContent className="flex flex-col items-center gap-4 pb-8 pt-4">
          {/* Progress bar / subtle indicator */}
          <div className="w-full px-6">
            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-2 bg-linear-to-r from-blue-500 via-green-400 to-emerald-500 animate-[pulse_1.8s_ease-in-out_infinite]"
                style={{ width: "36%" }}
              />
            </div>
          </div>

          {/* Animated dots */}
          <div className="flex items-center gap-2">
            <span
              className="h-2 w-2 rounded-full bg-slate-400 opacity-60 animate-bounce"
              style={{ animationDelay: "0s" }}
            />
            <span
              className="h-2 w-2 rounded-full bg-slate-400 opacity-60 animate-bounce"
              style={{ animationDelay: "150ms" }}
            />
            <span
              className="h-2 w-2 rounded-full bg-slate-400 opacity-60 animate-bounce"
              style={{ animationDelay: "300ms" }}
            />
          </div>

          <p className="text-xs text-slate-500 text-center px-6">
            This usually takes a few seconds — hang tight.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

const Dashboard = () => {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <DashboardRenderer />
    </Suspense>
  );
};

export default Dashboard;
