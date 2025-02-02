"use client";

import { Menu } from "lucide-react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import Link from "next/link";
import { useState } from "react";
import { UserButton } from "@clerk/nextjs";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

export const Header = () => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const isTeacherMode = pathname.startsWith("/teacher");

  console.log(pathname);

  return (
    <header className="flex items-center justify-between p-4 bg-blue-400 shadow-md">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" className="">
            <Menu className="w-6 h-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 bg-gray-900 text-white">
          <div className="text-xl font-bold">📚 StudyCircle</div>
          <nav className="mt-4 space-y-2">
            {isTeacherMode ? (
              <>
                <Link
                  href={"/teacher/courses"}
                  className="block py-2 px-3 rounded-lg hover:bg-gray-700"
                  onClick={() => setOpen(false)}
                >
                  Courses
                </Link>
                <Link
                  href={"/teacher/analytics"}
                  className="block py-2 px-3 rounded-lg hover:bg-gray-700"
                  onClick={() => setOpen(false)}
                >
                  Analytics
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/"
                  className={cn(
                    "block py-2 px-3 rounded-lg hover:bg-gray-700",
                    pathname === "/" && "bg-gray-600"
                  )}
                  onClick={() => setOpen(false)}
                >
                  Dashboard
                </Link>
                <Link
                  href="/search"
                  className={cn(
                    "block py-2 px-3 rounded-lg hover:bg-gray-700",
                    pathname === "/search" && "bg-gray-600"
                  )}
                  onClick={() => setOpen(false)}
                >
                  Browse
                </Link>
              </>
            )}
          </nav>
        </SheetContent>
      </Sheet>
      <div className="flex items-center space-x-4">
        {pathname === "/" ? (
          <Button
            variant={"secondary"}
            onClick={() => router.push("/teacher/courses")}
          >
            Teacher Mode
          </Button>
        ) : (
          isTeacherMode && (
            <>
              <Button
                variant={"secondary"}
                onClick={() => router.push("/")}
              >
                Exit
              </Button>
            </>
          )
        )}
        <UserButton />
      </div>
    </header>
  );
};
