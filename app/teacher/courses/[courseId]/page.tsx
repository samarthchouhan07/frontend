"use client";
import { TitleForm } from "@/components/courses/title-form";
import { Header } from "@/components/header";
import { Progress } from "@/components/ui/progress";
import { Settings } from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";

export default function CoursesIdPage() {
  const params = useParams();
  const courseId = params?.courseId as string;

  const [filledFields, setFilledFields] = useState(0);
  const totalFields = 5;
  return (
    <div className="flex min-h-screen">
      <div className="flex-1">
        <Header />
        <main className="p-6 max-w-2xl mx-auto space-y-4">
          <h1 className="text-2xl font-bold">Course Setup</h1>
          <div className="text-gray-600 text-sm">
            Complete all the fields ({filledFields}/{totalFields})
          </div>
          <Progress
            value={(filledFields / totalFields) * 100}
            className="h-2"
          />
          <div className="flex items-center gap-2 mt-4">
            <Settings className="w-6 h-6 text-blue=500" />
            <p className="text-lg font-medium">Customize your course</p>
          </div>
          <TitleForm courseId={courseId} />
        </main>
      </div>
    </div>
  );
}
