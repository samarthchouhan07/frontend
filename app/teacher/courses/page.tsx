"use client";
import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function CoursesPage() {
    const router=useRouter()
  return (
    <div className="flex min-h-screen">
      <div className="flex-1">
        <Header />
        <main className="p-6">
            <h1 className="text-2xl font-bold mb-4">
                Courses
            </h1>
          <Button onClick={()=>router.push("/teacher/create")}>
            New Course
          </Button>
        </main>
      </div>
    </div>
  );
}
