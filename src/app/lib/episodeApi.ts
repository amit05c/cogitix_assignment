// src/lib/episodeApi.ts
import axios from 'axios';
import { Episode } from '../types/Episode';

const BASE_URL = 'https://rickandmortyapi.com/api';

export async function fetchEpisodes(): Promise<Episode[]> {
  try {
    const response = await axios.get(`${BASE_URL}/episode`);
    return response.data.results;
  } catch (error) {
    console.error('Error fetching episodes:', error);
    throw error;
  }
}
