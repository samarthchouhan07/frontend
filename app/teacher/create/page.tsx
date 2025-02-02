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

const courseSchema = z.object({
  name: z.string().min(3, "Course name must be at least 3 characters"),
});

export default function CreatePage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<{
    name:string
  }>({
    resolver: zodResolver(courseSchema),
  });

  const onSubmit = async (data: { name: string }) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/course",
        data
      );
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
              <Input type="text" {...register("name")} />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
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
