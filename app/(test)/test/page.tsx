// pages/index.tsx
export default function Home() {
    const songs = [
      { title: "Song A", artist: "Artist A" },
      { title: "Song B", artist: "Artist B" },
      { title: "Song C", artist: "Artist C" },
    ];
  
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Danh sách bài hát</h1>
        <ul>
          {songs.map((song, index) => (
            <li key={index} className="mb-2">
              <a
                href={`/song/${index}`}
                className="w-full text-left p-2 bg-gray-200 hover:bg-gray-300 rounded block"
              >
                {song.title} - {song.artist}
              </a>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  