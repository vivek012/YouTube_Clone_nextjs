
import CategoryTabs from "../components/ui/category-tabs";
import Videogrid from "../components/ui/Videogrid";
import { Suspense } from "react";
import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "Youtube Clone",
  description: "Watch trending and latest videos",
};


export default function Home() {
  return (
    
    <main className="flex-1 p-4">
      <CategoryTabs />
      <Suspense fallback={<div>Loading Videos....</div>}>
        <Videogrid />
      </Suspense>
    </main>
   
  )
}
