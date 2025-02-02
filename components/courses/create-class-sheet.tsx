"use client";
import { useState } from "react";
import axios from "axios"
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function CardWithForm() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const router=useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
        const response=await axios.post("http://localhost:5000/api/classes",{
          name,
          description
        })
        setSuccessMessage(`Class ${response.data.name} created successfully`)
        router.push("/main/classes")
        setName("")
        setDescription("")
        setErrorMessage("")
        toast.success(successMessage) 
    } catch (error:any) {
        console.log("Error while submitting the form",error)
        const message=error.response?.data?.error||"Error while submitting the form"
        setErrorMessage(message)
        setSuccessMessage("")
        toast.error(errorMessage)
    }
  };

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Create Class</CardTitle>
        <CardDescription>
          Enter the name and the description of the class
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                id="name"
                placeholder="Name of your class"
                required
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="framework">Description</Label>
              <Input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                id="description"
                placeholder="Enter the description"
                required
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button onClick={handleSubmit}>Create</Button>
      </CardFooter>
    </Card>
  );
}
