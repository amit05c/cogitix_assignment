import React, { useEffect, useState } from 'react';
import { fetchCharacters, fetchCharactersByEpisodeId } from '../lib/characterApi';
import { Character } from '../types/Character';

interface CharacterFeedProps {
  episodeId: number | null;
}

const CharacterFeed: React.FC<CharacterFeedProps> = ({ episodeId }) => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [page, setPage] = useState<number>(1);
  const [nextPage, setNextPage] = useState<number | null>(null);

  useEffect(() => {
    loadCharacters();
  }, [episodeId, page]);

  const handleNextPage = () => {
    if (nextPage) {
      setPage(nextPage);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };


  async function loadCharacters() {
    try {
      if (episodeId) {
        const { characters: episodeCharacters, nextPage } = await fetchCharactersByEpisodeId(episodeId, page);
        setCharacters(episodeCharacters);
        setNextPage(nextPage);
      } else {
        const { characters: allCharacters, nextPage } = await fetchCharacters(page);
        setCharacters(allCharacters);
        setNextPage(nextPage);
      }
    } catch (error) {
      console.error('Failed to load characters:', error);
    }
  }

  return (
    <div className="p-4">
      <div className="grid grid-cols-3 gap-4">
        {characters.map((character) => (
          <div key={character.id} className="text-center">
            <img src={character.image} alt={character.name} className="w-full h-auto rounded" />
            <p className="mt-2 text-lg">{character.name}</p>
          </div>
        ))}
      </div>
      <div className="flex justify-between mt-4">
        <button
          disabled={page === 1}
          onClick={handlePrevPage}
          className={`px-4 py-2 bg-gray-800 text-white rounded ${page === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          Previous
        </button>
        <button
          onClick={handleNextPage}
          disabled={!nextPage}
          className={`px-4 py-2 bg-gray-800 text-white rounded ${!nextPage ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CharacterFeed;
