'use client'

import React, { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  FaBook,
  FaCompass,
  FaChartLine,
  FaMusic,
  FaTags,
  FaStar,
  FaHeadphones,
  FaHeart,
  FaListAlt,
  FaCloudUploadAlt,
  FaHistory,
} from "react-icons/fa"
import { IoIosPlayCircle } from "react-icons/io"
import { FaRadio } from "react-icons/fa6"
import { TfiMusicAlt } from "react-icons/tfi"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useStore } from "@/store/useStore"

interface MenuItem {
  label: string
  route: string
  icon: React.ReactNode
}

const Sidebar = () => {
  const menuItems: MenuItem[] = [
    { label: "Thư viện", route: "/library", icon: <FaBook /> },
    { label: "Khám phá", route: "/", icon: <FaCompass /> },
    { label: "#zingchart", route: "/zingchart", icon: <FaChartLine /> },
    { label: "Radio", route: "/radio", icon: <FaRadio /> },
  ]

  const canhan: MenuItem[] = [
    { label: "BXH nhạc mới", route: "/new-music-chart", icon: <TfiMusicAlt /> },
    { label: "Chủ đề", route: "/genres", icon: <FaListAlt /> },
    { label: "TOP 100", route: "/top-100", icon: <FaHeadphones /> },
    { label: "Nghe gần đây", route: "/recently-played", icon: <FaHistory /> },
    { label: "Bài hát yêu thích", route: "/favorites", icon: <FaHeart /> },
    { label: "Playlist", route: "/playlists", icon: <FaTags /> },
    { label: "Album", route: "/albums", icon: <FaStar /> },
    { label: "Đã tải lên", route: "/uploads", icon: <FaCloudUploadAlt /> },
  ]

  const [selectedItem, setSelectedItem] = useState<{ index: number; type: "menu" | "canhan" }>({
    index: 1,
    type: "menu",
  })
  const {isPlaying} = useStore()

  const handleSelection = (index: number, type: "menu" | "canhan") => {
    setSelectedItem({ index, type })
  }

  return (
    <div className="flex flex-col h-screen bg-stone-200/20">
      <div className="flex items-center justify-start gap-2 p-4 cursor-pointer">
        <Image alt="logo" src="/asset/logo.svg" width={40} height={40} />
        <span className="text-lg font-bold text-gray-700">TuiTenThaiMP3 V2</span>
      </div>

      <nav className="flex-shrink-0">
        {menuItems.map((item, index) => (
          <Link href={item.route} key={item.label}>
            <div
              className={`group flex items-center justify-between gap-3 p-5 cursor-pointer ${selectedItem.type === "menu" && selectedItem.index === index
                  ? "bg-gray-200 border-l-4 border-purple-600 text-purple-600 font-semibold"
                  : "text-gray-700 hover:text-purple-600 hover:bg-gray-200"
                }`}
              onClick={() => handleSelection(index, "menu")}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`text-xl ${selectedItem.type === "menu" && selectedItem.index === index
                      ? "text-purple-600"
                      : ""
                    }`}
                >
                  {item.icon}
                </div>
                <span>{item.label}</span>
              </div>
              <div
                className={`group-hover:block hidden ${selectedItem.type === "menu" && selectedItem.index === index
                    ? "text-purple-600"
                    : ""
                  }`}
              >
                <IoIosPlayCircle />
              </div>
            </div>
          </Link>
        ))}
      </nav>

      <Separator className="my-2" />
      <ScrollArea className={`${isPlaying ? "h-72":"h-80"}`}>
        <div className="pr-4">
          {canhan.map((item, index) => (
            <Link href={item.route} key={item.label}>
              <div
                className={`group flex items-center justify-between gap-3 p-5 cursor-pointer ${selectedItem.type === "canhan" && selectedItem.index === index
                    ? "bg-gray-200 border-l-4 border-purple-600 text-purple-600 font-semibold"
                    : "text-gray-700 hover:text-purple-600 hover:bg-gray-200"
                  }`}
                onClick={() => handleSelection(index, "canhan")}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`text-xl ${selectedItem.type === "canhan" && selectedItem.index === index
                        ? "text-purple-600"
                        : ""
                      }`}
                  >
                    {item.icon}
                  </div>
                  <span>{item.label}</span>
                </div>
                <div
                  className={`group-hover:block hidden ${selectedItem.type === "canhan" && selectedItem.index === index
                      ? "text-purple-600"
                      : ""
                    }`}
                >
                  <IoIosPlayCircle />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}

export default Sidebar