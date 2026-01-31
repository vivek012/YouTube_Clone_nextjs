"use client";

import { useState } from "react";

import { Avatar } from "@radix-ui/react-avatar";
import { AvatarFallback } from "./avatar";
import { Button } from "./button";
// import { ChannelType } from "@/src/app/channel/[id]/page";



interface userType {
  _id: string,
  name: string,
  email: string,
  channelName: string,
  description: string,
  image: string,
  joinedon: Date
}

export default function ChannelHeader({ channel }: { channel: userType,  }) {

  const [isSubscribed, setIsSubscribed] = useState(false);


  return (
    <div className="w-full" >

      {/* BANNER  */}

      <div className="relative h-32  md:h-48 lg:h-64 bg-linear-to-r from-blue-400 to-purple-500 overflow-hidden"></div>

      {/* CHANNEL INFO */}

      <div className=" px-4 py-6">
        <div className=" flex flex-col items-start md:flex-row gap-6">
          <Avatar className="w-12 h-12 rounded-full md:w-32 md:h-32">
            <AvatarFallback className="text-4xl">{channel?.channelName[0]}</AvatarFallback>
          </Avatar>
          <div className=" flex-1 space-y-2">
            <h1 className="text-2xl md:text-4xl font-bold">{channel?.channelName}</h1>
            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
              <span> {channel?.channelName?.toLowerCase().replace(/\s+/g, '')}</span>
            </div>
            {channel?.description && (
              <p className="text-sm text-gray-700 max-w-2xl">{channel?.description}</p>
            )}
          </div>
          {channel && channel?._id !== channel._id && (
            <div className="flex gap-2">
              <Button onClick={() => setIsSubscribed(prev => !prev)}
                variant={isSubscribed ? "outline" : "default"}
                className={isSubscribed ? "bg-gray-100" : "bg-red-600 hover:bg-red-700"}>
                {isSubscribed ? "Unsubscribe" : "Subscribe"}</Button>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}
