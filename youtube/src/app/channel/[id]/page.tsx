"use client"

import Channeltabs from "@/src/components/ui/Channeltabs";
import ChannelUploader from "@/src/components/ui/ChannelUploader";
import ChannelVideos from "@/src/components/ui/ChannelVideos";
import { useUser } from "@/lib/AuthContext";
import ChannelHeader from "@/src/components/ui/ChannelHeader";
import { notFound } from "next/navigation";
import { use } from "react";
import { log } from "console";

type Props = {
    params: Promise<{ id:string }>;
    
}



export interface ChannelType {
    _id: string;     
    name: string;
    email: string;
    description: string;
    joinedon: string;
}

export interface VideoType {
    _id: string;
    videotitle: string;
    filename: string;
    filetype: string;
    filepath: string;
    filesize: string;
    videochanel: string;
    Like: number;
    views: number;
    uploader: string;
    createdAt: string;
}

export default  function page({params}: Props) {
const {id} = use(params)


//    const [id, setId] = useState<string>("");
  
//   useEffect(() => {
//     params.then(p => setId(p.id));
//   }, [params]);
  
    
    const {user} = useUser();

    // const user = {
    //     id: "1",
    //     name: "jhon Doe",
    //     email: "john@example.com",
    //     image: "https://github.com/shadcn.png?height=32&width=32",
    // }

    try {

        const  channel = user
        // console.log(channel)

       

        const videos = [
            {
                _id: "1",
                videotitle: "Amazing Nature Documentary",
                filename: "nature-doc.mp4",
                filetype: "video/mp4",
                filepath: "/videos/nature-doc.mp4",
                filesize: "500MB",
                videochanel: "Nature Channel",
                Like: 1250,
                views: 45000,
                uploader: "nature_lover",
                createdAt: new Date().toISOString(),
            },
            {
                _id: "2",
                videotitle: "Cooking Tutorial: Perfect Pasta",
                filename: "pasta-tutorial.mp4",
                filetype: "video/mp4",
                filepath: "/videos/pasta-tutorial.mp4",
                filesize: "300MB",
                videochanel: "Chef's Kitchen",
                Like: 890,
                views: 23000,
                uploader: "chef_master",
                createdAt: new Date().toISOString(),
            },
        ];

        return (
            <div className="">
                <div className="">
                    <ChannelHeader channel={channel }  />
                    <Channeltabs />
                    <div className="px-4  pb-8  ">

                    <ChannelUploader channelId={channel?.id} channelName={channel?.channelName} />

                    </div>
                    <div className="px-4  pb-8">
                        <ChannelVideos videos={videos as VideoType[]} />
                    </div>
                </div>
            </div>
        );

    } catch (error) {

        console.error("Error fetching channel data:", error);
    }

}
