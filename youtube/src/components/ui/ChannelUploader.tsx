"use client";

import { Check, FileVideo, Upload, X } from "lucide-react";
import { useState, useRef } from "react";
import { toast } from "sonner";
import { Button } from "./button";
import { Label } from "./label";
import { Input } from "./input";
import { Progress } from "./progress";
import { axiosInstance } from "@/lib/axiosInstance";


export default function ChannelUploader({ channelId, channelName }: { channelId: string, channelName: string }) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoTitle, setVideoTitle] = useState("");
  const [uploadComplete, setUploadComplete] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (!file.type.startsWith("video/")) {
        toast.error("Please select a Valid video file.");
        return;
      }
      if (file.size > 100 * 1024 * 1024) {
        toast.error("File size exceeds 100MB limit.");
        return;
      }
      setVideoFile(file);
      const fileName = file.name;
      if (!videoTitle) {
        setVideoTitle(fileName.replace(/\.[^/.]+$/, ""));
      }

    }
  };

  const resetForm = () => {
    setVideoFile(null);
    setVideoTitle("");
    setUploadProgress(0);
    setIsUploading(false);
    setUploadComplete(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const cancelUpload = () => {
    if (isUploading) {
      toast.error("Your video Upload  has been cancelled.");
    }
  };

  const handleUpload = async () => {
    if (!videoFile || !videoTitle.trim()) {
      toast.error("Please provide a video file and title.");
      return;
    }
    const formdata = new FormData();
    formdata.append("file", videoFile)
    formdata.append("videotitle", videoTitle)
    formdata.append("videochanel", channelName)
    formdata.append("uploader", channelId)
    console.log(formdata)
    try {
      setIsUploading(true)
      setUploadProgress(0)
      const res = await axiosInstance.post("/api/video/upload", formdata, {
        
        onUploadProgress:(ProgressEvent: any)=>{
          const  progress = Math.round(
            (ProgressEvent.loaded*100)/ ProgressEvent.total
          );
          setUploadProgress(progress);

        }

      })
      toast.success("Upload Successfully")
      resetForm();
      
    } catch (error) {
      console.error("Error Uploading video:", error);
      toast.error("There was an error uplaoding your vido Please try again.");
    }finally{
      setIsUploading(false);
    }

  }

  return (
    <div className="bg-gray-50 rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Upload Video to {channelName}</h2>
      <div className="spayce-y-4">
        {!videoFile ? (
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:bg-gray-100 transition-colors" onClick={() => fileInputRef.current?.click()}>
            <Upload className="w-12 h-12 mx-auto text-gray-400 mb-2 " />

            <p className="text-lg font-medium">Drage and drop a video file to upload</p>
            <p className="text-gray-500 text-sm mt-1" >or click to select a video file</p>
            <p className="text-sm text-gray-400 mt-4">MP4 , WebM MOV or AVI  up to 100MB</p>
            <input type="file" accept="video/*" className="hidden" ref={fileInputRef} onChange={handleFileChange} />
          </div>
        ) : (<>
          <div className=" space-y-4">
            <div className=" flex items-center gap-3 p-3 bg-white rounded-lg shadow border  ">
              <div className="bg-blue-100 p-2 rounded-md">
                <FileVideo className="w-16 h-16 text-blue-600 " />
              </div>
              <div className=" flex-1 min-w-0">
                <p className="font-medium truncate">{videoFile.name}</p>
                <p className="text-sm text-gray-500">{(videoFile.size / (1024 * 1024)).toFixed(2)} MB</p>
              </div>
              {isUploading && (
                <Button variant="outline" className="ml-auto" onClick={cancelUpload}><X style={{width:20, height:20}} />Cancel</Button>
              )}
              {uploadComplete && (
                <div className=" bg-green-100 p-1 rounded-full">
                  <Check className="w-5 h-5 text-green-600"/>
                </div>
              )}
            </div>
            <div className="space-y-3">
              <div className="">
                <Label className="" htmlFor="title">Title (Required)</Label>
                <Input 
                  id="title" 
                  type="text" 
                  value={videoTitle}
                  onChange={(e) => setVideoTitle(e.target.value)}
                  placeholder="Enter video title"
                  className="mt-1 w-full"
                  disabled={isUploading || uploadComplete}
                  

                />
              </div>
            </div>
            {isUploading && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Uploading ...</span>
                    <span> {uploadProgress}%</span>
                </div>
                <Progress className="h2" value={uploadProgress} />
              </div>
            )}
            <div className="flex justify-end gap-3">
              {!uploadComplete && (
                <>
                <Button onClick={cancelUpload} disabled={uploadComplete}>Cancel Upload</Button>
                <Button onClick={handleUpload} disabled={isUploading || !videoTitle.trim() || uploadComplete} className="ml-2">{isUploading ? "Uploading..." : "Upload Video"}</Button>
                </>
              )}
            </div>
          </div>
        </>)}
      </div>

    </div >
  )
}
