"use client";
import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAuth } from "@clerk/nextjs";

const courseSchema = z.object({
  title: z.string().min(3, "Course name must be at least 3 characters"),
});

export default function CreatePage() {
  const router = useRouter();
  const {userId}=useAuth()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<{
    title:string
  }>({
    resolver: zodResolver(courseSchema),
  });

  const onSubmit = async (data: { title: string }) => {
    try {
      console.log("data",data)
      const response = await axios.post(
        "http://localhost:5000/api/courses",
        {
          title:data.title,
          userId:userId
        }
      );
      console.log("response",response)
      toast.success("Course Creation successful");
      router.push(`/teacher/courses/${response.data.id}`);
    } catch (error) {
      console.log("error while hitting the /api/course route", error);
    }
  };
  return (
    <div className="flex min-h-screen">
      <div className="flex-1">
        <Header />
        <main className="max-w-lg mx-auto p-6 bg-black shadow-md ronded-md mt-10">
          <h2 className="text-xl font-bold mb-4">Create a new Course</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Course name</label>
              <Input type="text" {...register("title")} />
              {errors.title && (
                <p className="text-red-500 text-sm">{errors.title.message}</p>
              )}
            </div>
            <div className="flex justify-between">
              <Button
                variant={"outline"}
                type="button"
                onClick={() => router.push("/teacher/create")}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                Continue
              </Button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
}
