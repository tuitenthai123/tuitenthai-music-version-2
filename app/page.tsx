"use client"
import React from "react";
import { Carousel } from "flowbite-react";
import { FaAngleRight } from "react-icons/fa6";
import { useStore } from "@/store/useStore";
import SongCard from "./_components/SongCard";
import Topicevent from "./_components/TopicEvent";
import Videocard from "./_components/Videocard";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import Top100card from "./_components/Top100card";

interface Showcase {
  key: string;
  imageUrl: string;
  title: string;
  description: string;
  thumbnail: string;
}

interface videoshow {
  key: string;
  thumbnail: string;
  title: string;
  description: string;
  duration: string;
  artists?: Arrartists;
}

interface infosong {
  key: string;
  artists?: Arrartists;
  thumbnail?: string;
  title?: string;
}

interface infotop100 {
  thumbnail?: string;
  title?: string;
}

interface artists {
  name: string;
}
interface TopicEvent {
  groupName: string;
  listPlaylist: Array<any>;
}

interface ArrShowcase extends Array<Showcase> { }
interface ArrSonginfo extends Array<infosong> { }
interface ArrVideoshow extends Array<videoshow> { }
interface Arrartists extends Array<artists> { }
interface ArrTop100 extends Array<infotop100> { }

const Page = () => {
  const [showcase, setShowcase] = React.useState<ArrShowcase>([]);
  const [Songinfo, setSonginfo] = React.useState<ArrSonginfo>([]);
  const [Videoshow, setVideoshow] = React.useState<ArrVideoshow>([]);
  const [topicEvent, setTopicEvent] = React.useState<TopicEvent[]>([])
  const [Top100, setTop100] = React.useState<ArrTop100>([])
  const [isLoading, setIsLoading] = React.useState(true);
  const { isPlaying, togglePlay, addToPlaylist, setCurrentSong } = useStore();

  React.useEffect(() => {
    const handleFetchData = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/get-home`, {
          method: "GET",
        });
        const jsonResponse = await response.json();
        console.log(jsonResponse);
        setShowcase(jsonResponse?.showcase || []);
        setSonginfo(jsonResponse?.song || []);
        setTopicEvent(jsonResponse?.topicEvent || [])
        setVideoshow(jsonResponse?.video || [])
        setTop100(jsonResponse?.top100 || [])
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    handleFetchData();
  }, []);

  const handleFetchDataSong = async (key:any) => {
    try {
      const responsesong = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/get-song`, {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body:JSON.stringify({key:key})
      });
      
      const jsonResponsesong = await responsesong.json()
      addToPlaylist(jsonResponsesong?.song);
      setCurrentSong(jsonResponsesong?.song);
      togglePlay(true);
      console.log(jsonResponsesong)
    } catch (error) {
      console.error(error);
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
        <p className="ml-4 text-lg text-blue-500 font-bold">Đang tải dữ liệu...</p>
      </div>
    );
  }

  return (
    <div className={`container mx-auto px-4 flex-1 ${isPlaying ? "mb-16" : ""}`}>
      <div className="h-[270px] sm:h-[320px] lg:h-[370px]">
        <Carousel pauseOnHover slideInterval={4000}>
          {showcase.map((item, index) => (
            <img
              key={item.key}
              src={item?.imageUrl}
              alt={`${item.title || "Carousel Image"} ${index}`}
              className="w-full h-full object-fill rounded-md"
            />
          ))}
        </Carousel>
      </div>
      <div className="md:my-5 my-2">
        <span className="flex items-center gap-2 text-2xl text-sky-500 font-thin">
          NHẠC MỚI MỖI NGÀY <FaAngleRight />
        </span>
      </div>
      <ScrollArea className="w-full">
        <div className="grid grid-rows-3 grid-flow-col gap-4 mb-5">
          {Songinfo.map((items) => (
            <div
              key={items?.key}
              className="flex flex-col items-center justify-center"
              onClick={() => {
                togglePlay;
                handleFetchDataSong(items?.key)
              }}>
              <SongCard
                artists={items?.artists?.map(artist => artist.name).join(", ")}
                thumbnail={items?.thumbnail}
                title={items?.title}
              />
            </div>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
      <div className="mt-5">
        {topicEvent.map((items, index) => (
          <Topicevent key={index} groupName={items?.groupName} listPlaylist={items?.listPlaylist} />
        ))}
      </div>

      <div className="md:my-5 my-2">
        <span className="flex items-center gap-2 text-2xl text-sky-500 font-thin">
          VIDEO <FaAngleRight />
        </span>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {Videoshow.map((items, index) => (
          <div key={index} className={index < 2 ? "col-span-full sm:col-span-1 md:col-span-3 lg:col-span-2" : ""}>
            <Videocard
              artists={items?.artists?.map(artist => artist.name).join(", ")}
              thumbnail={items.thumbnail}
              title={items.title}
              duration={items.duration}
            />
          </div>
        ))}
      </div>
      <div className="md:my-5 my-2">
        <span className="flex items-center gap-2 text-2xl text-sky-500 font-thin">
          TOP 100 <FaAngleRight />
        </span>
      </div>
      <ScrollArea className="w-full">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {Top100.map((item, index) => (
            <div key={index} className="flex justify-center">
              <Top100card thumbnail={item?.thumbnail} title={item?.title} />
            </div>
          ))}
        </div>
        <ScrollBar orientation="horizontal" className="mt-4" />
      </ScrollArea>
    </div>
  );
};

export default Page;
