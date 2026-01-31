"use client"
import React, { useState } from 'react'
import { Clock, Compass, History, Home, PlaySquare, ThumbsUp, User } from "lucide-react"
import { Button } from './button'
import Link from 'next/link'
import ChannelDialogue from './ChannelDialogue'
import { useUser } from '@/lib/AuthContext'

const Sidebar = () => {
   const {user} = useUser()
  const [DialogOpen, setDialogOpen] = useState(false)


  return (
    <aside className='w-64  bg-white border-r min-h-screen p-2'>
      <nav className='space-y-2'>
        <Link href="/">
          <Button variant="ghost" className='w-full justify-start'>
            <Home style={{ width: 24, height: 24 }} className='mr-3 ' />
            Home
          </Button>
        </Link>
        <Link href="/explore">
          <Button variant="ghost" className='w-full justify-start'>
            <Compass style={{ width: 24, height: 24 }} className='w-6 h-6 mr-3' />
            Explore
          </Button>
        </Link>
        <Link href="/subscriptions">
          <Button variant="ghost" className='w-full justify-start'>
            <PlaySquare style={{ width: 24, height: 24 }} className='w-6 h-6 mr-3' />
            Subcriptions
          </Button>
        </Link>

        {user && (
          <div className="pt-2 border-t-2 mt-3">
            <Link href="/history">
              <Button variant="ghost" className='w-full justify-start'>
                <History style={{ width: 24, height: 24 }} className='w-6 h-6 mr-3' />
                History
              </Button>
            </Link>
            <Link href="/liked">
              <Button variant="ghost" className='w-full justify-start'>
                <ThumbsUp style={{ width: 24, height: 24 }} className='w-6 h-6 mr-3' />
                Liked Videos
              </Button>
            </Link>
            <Link href="/watch-later">
              <Button variant="ghost" className=' w-full justify-start'>
                <Clock style={{ width: 24, height: 24 }} className='mr-3' />
                Watch Later
              </Button>
            </Link>
            {user?.channelName ? (
              <Link href={`/channel/${user._id}`}>
                <Button variant="ghost" className='w-full justify-start '>
                  <User style={{ width: 24, height: 24 }} className='mr-3' />
                  Your Channel
                </Button>
              </Link>
            ) : (
              <div className="px-2 py-1.5">
                <Button onClick={()=> setDialogOpen(true)}  variant="secondary" size="sm" className="w-full">  Create Channel</Button>
              </div>

            )}
          </div>
        )}
      </nav>
       <ChannelDialogue isopen={DialogOpen} onclose={() => setDialogOpen(false)} mode="create" />
    </aside>
  )
}

export default Sidebar











// export default function Form() {
//   return (
//     <div>
//       <form action=""></form>
//     </div>
//   )
// }
