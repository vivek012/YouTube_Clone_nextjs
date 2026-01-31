'use client'
import Sidebar from "../components/ui/Sidebar";
import "./globals.css";


import { Toaster } from "sonner";
import Header from "../components/ui/Header";
import { UserProvider } from "@/lib/AuthContext";



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className='min-h-screen text-black bg-white' >
        <UserProvider>
        <Header />
        <Toaster/>
        <div className="flex">
          <Sidebar />
          <main className="flex-1">

            {children}
          </main>
        </div>
        </UserProvider>
      </body>
    </html>
  );
}
