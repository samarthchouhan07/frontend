"use client";
import { Header } from "@/components/header";

export default function AnalyticsPage() {
  return (
    <div className="flex min-h-screen">
      <div className="flex-1">
        <Header />
        <main className="p-6">
          <p>Welcome to analytics page!</p>
        </main>
      </div>
    </div>
  );
}
