"use client";

import { BookOpen } from "lucide-react";
import { Button } from "./ui/button";

export const Navigation = () => {
  return (
    <nav className="flex-1 p-4">
      <ul className="space-y-4">
        <Button className="flex gap-x-3" variant={"ghost"}>
          <BookOpen className="w-5 h-5" />
          <span className="">Courses</span>
        </Button>
        <div className="p-4 text-center text-sm">
          <p>© {new Date().getFullYear()} StudyCircle</p>
        </div>
      </ul>
    </nav>
  );
};
