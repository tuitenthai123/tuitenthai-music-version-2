import type { Metadata } from "next"
import Sidebar from "./_components/Sidebar"
import { Navbar } from "./_components/Navbar"
import { Player } from "./_components/PlayerMusic"
import "./globals.css"
import { ScrollArea } from "@/components/ui/scroll-area"
import type React from "react"
//import { useStore } from "@/store/useStore"  // Import useStore từ zustand

export const metadata: Metadata = {
  title: "Tuitenthaimp3",
  description: "Chill time with me",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {

  return (
    <html lang="en">
      <body>
        <div>
          <div>
            <div className="flex flex-col md:flex-row">
              <aside className="w-2/12 md:w-64 bg-stone-200/65 h-auto">
                <div className="hidden md:flex h-full flex-col inset-y-0 z-50">
                  <Sidebar />
                </div>
              </aside>
              <div className="flex-col w-full md:w-10/12">
                <div className="w-full">
                  <Navbar />
                </div>
                <ScrollArea className="w-full h-[calc(100vh-64px)]">
                  <main className="w-full p-4 ">{children}</main>
                </ScrollArea>
              </div>
            </div>
          </div>
          <div className="fixed bottom-0 left-0 w-full">
            <Player />
          </div>
        </div>
      </body>
    </html>
  )
}
