import HistoryContent from "@/src/components/ui/HistoryContent";
import { Suspense } from "react";



export default function page() {
 

  return (
    <main className="flex-1 p-6">
      <div className="max-w-4xl   ">
        <h1 className="text-2xl font-bold mb-6">Watch History</h1>
        <Suspense fallback={<div>Loading...</div>}  >
          <HistoryContent />
        </Suspense>
      </div>
    </main>
  )
}  



































































// "use client";

// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import { Search, Trash2, Clock } from "lucide-react";

// const historyData = [
//   {
//     id: 1,
//     title: "Next.js 14 Full Course",
//     channel: "Code with Vivek",
//     time: "2 hours ago",
//     thumbnail: "https://picsum.photos/seed/nextjs/300/180",
//   },
//   {
//     id: 2,
//     title: "Tailwind CSS Complete Guide",
//     channel: "Frontend Masters",
//     time: "Yesterday",
//     thumbnail: "https://picsum.photos/seed/tailwind/300/180",
//   },
//   {
//     id: 3,
//     title: "Shadcn UI Explained",
//     channel: "JS Adda",
//     time: "3 days ago",
//     thumbnail: "https://picsum.photos/seed/shadcn/300/180",
//   },
// ];

// export default function HistoryPage() {
//   return (
//     <div className="flex min-h-screen bg-background">
//       {/* Sidebar */}
//       <aside className="w-64 border-r p-4 hidden md:block">
//         <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
//           <Clock className="w-5 h-5" /> History
//         </h2>
//         <Button variant="destructive" className="w-full gap-2">
//           <Trash2 className="w-4 h-4" /> Clear all history
//         </Button>
//       </aside>

//       {/* Main Content */}
//       <main className="flex-1 p-6">
//         {/* Search */}
//         <div className="flex items-center gap-2 mb-6 max-w-md">
//           <Search className="w-5 h-5 text-muted-foreground" />
//           <Input placeholder="Search watch history" />
//         </div>

//         {/* History List */}
//         <ScrollArea className="h-[calc(100vh-120px)]">
//           <div className="space-y-4">
//             {historyData.map((video) => (
//               <Card key={video.id} className="hover:shadow-md transition">
//                 <CardContent className="flex gap-4 p-4">
//                   <img
//                     src={video.thumbnail}
//                     alt={video.title}
//                     className="w-40 rounded-lg object-cover"
//                   />
//                   <div className="flex-1">
//                     <h3 className="font-semibold line-clamp-2">
//                       {video.title}
//                     </h3>
//                     <p className="text-sm text-muted-foreground">
//                       {video.channel}
//                     </p>
//                     <p className="text-xs text-muted-foreground mt-1">
//                       Watched {video.time}
//                     </p>
//                   </div>
//                   <Button variant="ghost" size="icon">
//                     <Trash2 className="w-4 h-4" />
//                   </Button>
//                 </CardContent>
//               </Card>
//             ))}
//           </div>
//         </ScrollArea>
//       </main>
//     </div>
//   );
// }
