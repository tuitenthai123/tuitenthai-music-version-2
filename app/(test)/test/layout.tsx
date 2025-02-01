"use client"
import { ReactNode, useState } from "react";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [currentSong, setCurrentSong] = useState<null | { title: string; artist: string }>(null);

  const playSong = (song: { title: string; artist: string }) => {
    setCurrentSong(song);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="bg-blue-500 text-white p-4">Header</header>

      {/* Main Content */}
      <main className="flex-1">{children}</main>

      {/* Footer - Player */}
      {currentSong && (
        <footer className="fixed bottom-0 left-0 w-full bg-gray-800 text-white p-4 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-lg font-semibold">{currentSong.title}</h4>
              <p className="text-sm">{currentSong.artist}</p>
            </div>
            <button
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
              onClick={() => setCurrentSong(null)}
            >
              Đóng
            </button>
          </div>
        </footer>
      )}
    </div>
  );
}
