import React from 'react'
import { Separator } from "@/components/ui/separator";
import { IoPlayCircle } from "react-icons/io5";
import { FaHeartCirclePlus } from "react-icons/fa6";

interface infometasong {
    artists?: string;
    thumbnail?: string;
    title?: string;
}

const SongCard: React.FC<infometasong> = ({ artists, thumbnail, title }) => {
    return (
        <div className='w-96 flex flex-col gap-1 group'>
            <Separator />
            <div className='flex justify-between items-center'>
                <div className='flex items-center gap-3'>
                    <div className='w-12 h-12 flex-shrink-0'>
                        <img
                            src={thumbnail}
                            alt={`${title || "Hình ảnh bài hát"}`}
                            className="w-full h-full object-fill rounded-sm"
                        />
                    </div>
                    <div className='flex flex-col flex-grow'>
                        <span className='line-clamp-1 text-base hover:text-sky-500 cursor-pointer'>{title}</span>
                        <span className='line-clamp-1 text-xs text-stone-400 hover:text-sky-500 cursor-pointer'>{artists}</span>
                    </div>
                </div>
                <div className='invisible items-center space-x-1 group-hover:visible visible flex'>
                    <FaHeartCirclePlus className='hover:text-sky-500'/>
                    <IoPlayCircle className='hover:text-sky-500'/>
                </div>
            </div>

        </div>
    )
}

export default SongCard