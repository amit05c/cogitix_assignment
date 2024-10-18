// src/lib/characterApi.ts
import axios from 'axios';
import { Character } from '../types/Character';

const BASE_URL = 'https://rickandmortyapi.com/api';

// Fetch all characters with pagination
export async function fetchCharacters(page: number = 1): Promise<{ characters: Character[], nextPage: number | null }> {
  try {
    const response = await axios.get(`${BASE_URL}/character`, { params: { page } });
    const nextPage = response.data.info.next ? page + 1 : null;

    return {
      characters: response.data.results,
      nextPage,
    };
  } catch (error) {
    console.error('Error fetching characters:', error);
    throw error;
  }
}

// Fetch characters from a specific episode with pagination
export async function fetchCharactersByEpisodeId(episodeId: number, page: number = 1): Promise<{ characters: Character[], nextPage: number | null }> {
  try {
    const episodeResponse = await axios.get(`${BASE_URL}/episode/${episodeId}`);
    const characterUrls = episodeResponse.data.characters;

    const startIndex = (page - 1) * 20;
    const endIndex = page * 20;
    const characterPageUrls = characterUrls.slice(startIndex, endIndex);

    const characterPromises = characterPageUrls.map((url: string) => axios.get(url));
    const characterResponses = await Promise.all(characterPromises);

    const nextPage = endIndex < characterUrls.length ? page + 1 : null;
    
    return {
      characters: characterResponses.map((res) => res.data),
      nextPage,
    };
  } catch (error) {
    console.error('Error fetching characters by episode:', error);
    throw error;
  }
}
