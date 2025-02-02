"use client";
import axios from "axios";
import { FormEvent, useEffect, useState } from "react";
import { toast } from "sonner";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useUser } from "@clerk/nextjs";

interface CourseTypes {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  category: string;
  creatorId: string;
}

export const CourseManagement = () => {
  const [courses, setCourses] = useState<CourseTypes[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [category, setCategory] = useState("");
  const { user } = useUser();

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/courses");
      setCourses(response.data);
    } catch (error) {
      console.log("Error while fetching the courses", error);
      toast.error("Error while course fetching");
    }
  };

  const createCourse = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/courses", {
        title,
        description,
        thumbnail,
        creatorId: user?.id,
        category,
      });
      setCourses([...courses, response.data]);
      setTitle("");
      setDescription("");
      setThumbnail("");
      setCategory("");
    } catch (error) {
      console.log("Error while creating the course", error);
      toast.error("Error while course creation");
    }
  };
  return (
    <div>
      <h1>Course Management</h1>
      <form onSubmit={createCourse}>
        <Input
          type="text"
          placeholder="Enter the title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <Input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Thumbnail Url"
          value={thumbnail}
          onChange={(e) => setThumbnail(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <Button type="submit">Create Course</Button>
      </form>
      <h2>Existing Courses</h2>
      <ul>
        {courses.map((course) => (
          <li key={course.id}>
            <h3>{course.title}</h3>
            <p>{course.description}</p>
            <p>Category:{course.category}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};