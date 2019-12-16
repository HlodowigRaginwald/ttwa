import axios from 'axios';

const { localStorage, location } = window;

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_SPOTIFY_API_URL,
});

axiosInstance.interceptors.request.use((config) => {
  Object.assign(config.headers, {
    Authorization: `Bearer ${localStorage.getItem(process.env.REACT_APP_STORAGE_SPOTIFY_ACCESS_TOKEN)}`,
  });

  return config;
});

axiosInstance.interceptors.response.use((response) => response, (error) => {
  if (error.response.status === 401) {
    location.pathname = '/login';
  }
  Promise.reject(error);
});

export async function searchArtistByQuery(query, {
  limit = 20,
  offset = 0,
} = {}) {
  const response = await axiosInstance.get(
    '/search',
    {
      params: {
        q: query,
        type: 'artist',
        limit,
        offset,
      },
    },
  );
  return response.data.artists;
}

export async function getAlbumsByArtistId(artistId, {
  limit = 20,
  offset = 0,
} = {}) {
  const response = await axiosInstance.get(
    `/artists/${artistId}/albums`,
    {
      params: {
        limit,
        offset,
      },
    },
  );
  return response.data;
}

export async function getArtistInfoByArtistId(artistId) {
  const response = await axiosInstance.get(
    `/artists/${artistId}`,
  );
  return response.data;
}
