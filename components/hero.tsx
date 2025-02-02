"use client"
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

export const Hero = () => {
  const router=useRouter()
  const handleClick=()=>{
    router.push("/main/courses")
  }
  return (
    <div className="bg-blue-700 text-white py-20 text-center">
      <div className="max-w-5xl mx-auto">
        <h2>Empower Your learning with studyCircle</h2>
        <p className="mt-4 text-lg">
          Join a community where learning is interactive, engaging, and
          personalized.
        </p>
        <Button onClick={handleClick} className="mt-6 bg-yellow-500 text-blue-900 px-8 py-3 rounded-full font-semibold hover:bg-yellow-400 transition-all">
          Get Started
        </Button>
      </div>
    </div>
  );
};
