"use client";
import { Header } from "@/components/header";

export default function CoursesPage() {
  return (
    <div className="flex min-h-screen">
      <div className="flex-1">
        <Header />
        <main className="p-6">
          <p>Welcome to courses page!</p>
        </main>
      </div>
    </div>
  );
}
