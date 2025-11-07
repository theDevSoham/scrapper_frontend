import AuthButtons from "@/components/AuthButtons";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center h-screen bg-gray-50">
      <h1 className="text-3xl font-semibold mb-8 text-gray-800">
        Social Scrapper MVP
      </h1>
      <AuthButtons />
    </main>
  );
}
