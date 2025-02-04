"use client";
import { useAuth } from "@clerk/nextjs";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Edit, Loader2, X } from "lucide-react";

interface TitleFormProps {
  courseId: string;
}

interface Course {
  courseId: string;
  title: string;
}

export const TitleForm = ({ courseId }: TitleFormProps) => {
  const [course, setCourse] = useState<Course | null>(null);
  const { userId } = useAuth();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/courses/${courseId}`).then((res) => {
      setCourse(res.data);
      setNewTitle(res.data.title);
    });
  }, [userId, courseId, router]);

  const handleUpdateTitle = async () => {
    if (!newTitle.trim()) {
      toast.error("Title cannot be empty");
      return;
    }
    setLoading(true);
    try {
      console.log(
        `Sending PATCH request to: http://localhost:5000/api/courses/${courseId}`
      );
      console.log("Payload:", { title: newTitle });

      const response = await axios.patch(`http://localhost:5000/api/courses/${courseId}`, {
        title: newTitle,
      }) .then(response => console.log(response.data))

      setCourse({ ...course!, title: newTitle });
      toast.success("Course title updated successfully");
      console.log("response",response);
      setIsEditing(false);
      router.refresh();
    } catch (error) {
      console.log("handleUpdateTitle error", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };
  //  if(!course) return <p className="text-center mt-10">Loading...</p>
  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-black rounded-lg shadow-md">
      <h2 className="text-2xl font-bold">Course Setup</h2>
      <p>Complete all the fields (0/5) done</p>
      <div className="mt-6 bg-gray-900 p-4 rounded-md shadow">
        {isEditing ? (
          <>
            <div className="flex items-center gap-4 ">
              <Input
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="flex-1"
              />
              <Button onClick={handleUpdateTitle} disabled={loading}>
                {loading ? <Loader2 className="animate-spin" /> : "Save"}
              </Button>
              <Button variant={"outline"} onClick={handleEditToggle}>
                <X size={18} />
              </Button>
            </div>
          </>
        ) : (
          <>
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold">{course?.title}</h3>
              <Button variant={"outline"} onClick={handleEditToggle}>
                <Edit size={18} className="mr-2" /> Edit
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
