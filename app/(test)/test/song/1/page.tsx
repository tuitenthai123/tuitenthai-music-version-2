"use client"
export default function SongDetail() {
  const song = { title: `Song $123`, artist: `Artist 123` };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">{song.title}</h1>
      <p className="text-lg">{song.artist}</p>
      <button
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
        onClick={() => alert("Play this song!")}
      >
        Play Song
      </button>
    </div>
  );
}
