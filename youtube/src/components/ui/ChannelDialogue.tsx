"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "./dialog";
import { Input } from "./input";
import { Label } from "./label";
import { Textarea } from "./textarea";
import { Button } from "./button";
import { axiosInstance } from "@/lib/axiosInstance";
import { useUser } from "@/lib/AuthContext";
import { useRouter } from "next/navigation";




interface ChannelData {
  name: string;
  description: string;
}

interface userType {
    id: string,
    name: string,
    email: string,
    channelName?: string,
    description: string,
    image: string,
    joinedon: Date
}

export default function ChannelDialogue({ isopen, onclose, channelData, mode }: { isopen: boolean, onclose: () => void, channelData?: ChannelData, mode: "create" | "edit" }) {

 const router = useRouter()

 const {user,login} = useUser()

  const [formData, setFormData] = useState(() => ({
    name: mode === "edit" ? channelData?.name ?? "" : "",
    description: mode === "edit" ? channelData?.description ?? "" : "",
  }));

  const [isSubmitting, setIsSubmitting] = useState(false);



  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      channelName: formData.name,
      description: formData.description
    };


    const response = await axiosInstance.patch(`/api/user/update-profile/${user._id}`, payload)
    login(response?.data)
    router.push( `/channel/${user._id}`)
    setFormData({
      name: "",
      description: ""
    })
    onclose();
  }

  return (
    <Dialog open={isopen} onOpenChange={onclose}>
      <DialogContent className="sm:max-w-md md:max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {mode === "create" ? "Create Channel" : "Edit Channel"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 ">
          {/*   CHANNEL NAME */}
          <div className="space-y-2">
            <Label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Channel Name
            </Label>
            <Input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          {/*   DESCRIPTION */}
          <div className="space-y-2">
            <Label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description
            </Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-md"
              placeholder="Tell viewers about your Channel..."
              rows={4}
            />

          </div>

          <DialogFooter className="flex justify-between sm:justify-between gap-2">
            <Button type="button" onClick={onclose} variant="outline">Cancel</Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (mode === "create" ? "Creating..." : "Updating...") : (mode === "create" ? "Create Channel" : "Update Channel")}
            </Button>
          </DialogFooter>

        </form>

      </DialogContent>
    </Dialog>
  )
}
