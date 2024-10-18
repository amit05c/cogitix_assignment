'use client'
import CharacterFeed from "@/Components/CharacterFeed";
import EpisodeList from "@/Components/EpisodeList";
import { useState } from "react";

export default function Home() {
  const [selectedEpisode, setSelectedEpisode] = useState<number | null>(null);

  return (
    <div className="flex h-screen">
      <div className="w-1/4  h-full bg-gray-900 p-4 overflow-y-auto">
        <h2 className="text-white text-2xl mb-4">Episodes</h2>
        <EpisodeList onSelect={setSelectedEpisode} selectedEpisode={selectedEpisode || 0} />
      </div>

      <div className="flex-1 p-4 overflow-y-auto h-full">
        <CharacterFeed episodeId={selectedEpisode} />
      </div>
    </div>
  );
}
