import React from 'react'

interface infometasong {
    thumbnail?: string;
    title?: string;
}

const Top100card: React.FC<infometasong> = ({ thumbnail, title }) => {
    return (
        <div className='flex-shrink-0 w-32 sm:w-40 cursor-pointer'>
            <div className='aspect-square w-full overflow-hidden rounded-sm'>
                <img
                    src={thumbnail}
                    alt={`${title || "Hình ảnh bài hát"}`}
                    className="w-full h-full object-cover"
                />
            </div>
        </div>
    )
}

export default Top100card