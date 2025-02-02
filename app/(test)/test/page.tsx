// "use client";

// import { useAudio } from "@/lib/provider/Audioprovider";
// import React from "react";

// const MusicPlayer = () => {
//   const { isPlaying, togglePlay, setAudioSrc, currentTime, duration } = useAudio();

//   // Thiết lập audio URL
//   const audioUrl =
//     "https://stream.nixcdn.com/NCTSong/2501/4b/f5/1rdj7wskhv.mp3?st=LMJpOuTFopOrG2CYeEODWQ&e=1738559638";

//   // Tải audio khi lần đầu
//   React.useEffect(() => {
//     setAudioSrc(audioUrl);
//   }, [audioUrl, setAudioSrc]);

//   const formatTime = (time: number) => {
//     const minutes = Math.floor(time / 60);
//     const seconds = Math.floor(time % 60);
//     return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
//   };

//   return (
//     <div className="fixed bottom-4 left-4 p-4 bg-gray-800 text-white rounded-lg shadow-lg flex items-center space-x-4">
//       <button
//         onClick={togglePlay}
//         className="bg-blue-500 p-2 rounded-full text-white hover:bg-blue-600"
//       >
//         {isPlaying ? "Pause" : "Play"}
//       </button>
//       <div>
//         <p>{formatTime(currentTime)} / {formatTime(duration)}</p>
//       </div>
//     </div>
//   );
// };

// export default MusicPlayer;
