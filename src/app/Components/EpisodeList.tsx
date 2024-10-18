import React, { useEffect, useState } from 'react';
import { fetchEpisodes } from '../lib/episodeApi';
import { Episode } from '../types/Episode';

interface EpisodeListProps {
  onSelect: (id: number) => void;
  selectedEpisode: number;
}

const EpisodeList: React.FC<EpisodeListProps> = ({ onSelect, selectedEpisode }) => {
  const [episodes, setEpisodes] = useState<Episode[]>([]);

  useEffect(() => {
    async function loadEpisodes() {
      try {
        const episodesData = await fetchEpisodes();
        setEpisodes(episodesData);
      } catch (error) {
        console.error('Failed to load episodes:', error);
      }
    }

    loadEpisodes();
  }, []);

  return (
    <div className="p-4 bg-gray-800 text-white">
      {episodes.map((episode) => (
        <div
          key={episode.id}
          onClick={() => onSelect(episode.id)}
          className={`cursor-pointer p-2 rounded ${selectedEpisode === episode.id ? 'bg-gray-600' : 'hover:bg-gray-700'}`}
        >
          {episode.name}
        </div>
      ))}
    </div>
  );
};

export default EpisodeList;
