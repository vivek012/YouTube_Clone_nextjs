"use client"
import { Menu, Youtube, Search, Mic, VideoIcon, Bell, User } from "lucide-react"

import { Button } from './button'
import Link from "next/link"
import { useState } from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "./dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "./avatar"
import ChannelDialogue from "./ChannelDialogue"
import { useRouter } from "next/navigation"; 
import { useUser } from "@/lib/AuthContext"



const Header = () => {
    const {user, logout, handleGoogleSignIn} = useUser()
   

    const [searchQuery, setSearchQuery] = useState("")
 
    const [DialogOpen, setDialogOpen] = useState(false)
    const router = useRouter();

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault(); 
        if (searchQuery.trim()) {
            router.push(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
        }
    }

    const handleKeypress = (e: React.KeyboardEvent) =>{
        if (e.key === 'Enter') {
            handleSearch(e as unknown as React.FormEvent);
        }
    }



    return (
        <header className="flex justify-between items-center px-4 py-2  bg-white border-b">
            <div className="flex  items-center gap-4">
                <Button variant="ghost" className="">
                    <Menu style={{ width: 24, height: 24 }} className="w-6 h-6" />
                </Button>
                <Link className="flex items-center gap-2" href="/">
                    <div className=" flex items-center justify-center bg-red-600 rounded p-1 ">
                        <Youtube className="w-6 h-6 rounded-sm text-white bg-red-600" />
                    </div>
                    <span className="text-xl font-medium ">Youtube</span>
                    <span className=" text-xs text-gray-400 ml-1">IN</span>
                </Link>
            </div>
            <form onSubmit={handleSearch} className="flex  items-center gap-2 max-w-2xl mx-4  flex-1 " >
                <div className="flex ">
                    <input
                        type="search"
                        placeholder="Search"
                        value={searchQuery}
                        onKeyPress={handleKeypress}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="rounded-l-full text- pl-8 outline focus-visible:ring"
                    />
                    <Button type="submit"
                        className="rounded-r-full p-6 bg-gray-500 hover:bg-gray-600 text-white`  border border-1-0"
                    ><Search style={{ width: 24, height: 24 }} className="" /></Button>
                </div>
                <Button variant="ghost" className="roounded-full">
                    <Mic style={{ width: 24, height: 24 }} className="" />
                </Button>
            </form>
            <div className="flex items-center gap-2">
                {user ? (
                    <>
                        <Button variant="ghost" size="icon" >
                            <VideoIcon style={{ width: 24, height: 24 }} />
                        </Button>
                        <Button variant="ghost" className="">
                            <Bell style={{ width: 24, height: 24 }} className="" />
                        </Button>
                        <DropdownMenu  >
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="relative h-8 w-8">
                                    <Avatar className="h-8 w-8">
                                        <AvatarImage className="" src={user.image }  />
                                        <AvatarFallback>
                                            {user.name?.[0] || "U"}
                                        </AvatarFallback>
                                    </Avatar>
                                </Button>
                            </DropdownMenuTrigger>

                            <DropdownMenuContent className="w-56" align="end" forceMount>
                                {user?.channelName ?  (
                                    <DropdownMenuItem asChild>
                                        <Link href={`/channel/${user._id}`}> Your Channel</Link>
                                    </DropdownMenuItem>
                                ) : (
                                    <div className="px-2 py-1.5">
                                        <Button onClick={()=> setDialogOpen(true)} variant="secondary" size="sm" className="w-full">  Create Channel</Button>
                                    </div>

                                )}

                                <DropdownMenuItem asChild>
                                    <Link href={`/history`}> History</Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <Link href={`/likes`}> Likes</Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <Link href="/watch-later">Watch later</Link>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={logout} >Sign out</DropdownMenuItem>
                            </DropdownMenuContent>

                        </DropdownMenu>
                    </>
                ) : (
                    <>
                        <Button className="flex items-center gap-2" onClick={handleGoogleSignIn}>
                            <User className="w-4 h-4" />
                            Sign Up
                        </Button>
                    </>
                )}
            </div>
            <ChannelDialogue isopen={DialogOpen} onclose={() => setDialogOpen(false)} mode="create" />
        </header>
    )
}

export default Header
