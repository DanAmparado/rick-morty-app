import axios from 'axios';

const api = axios.create({
  baseURL: 'https://rickandmortyapi.com/api',
});

export const getCharacters = async (page = 1, name = '', status = '', species = '') => {
  const params = { page, name, status, species };
  Object.keys(params).forEach(key => {
    if (params[key as keyof typeof params] === '') {
      delete params[key as keyof typeof params];
    }
  });

  try {
    const response = await api.get('/character', { params });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      return { results: [], info: { count: 0, pages: 0, next: null, prev: null } };
    }
    throw error;
  }
};

export const getCharacterById = async (id: number) => {
  const response = await api.get(`/character/${id}`);
  return response.data;
};

export const getCharactersByIds = async (ids: number[]) => {
  if (ids.length === 0) {
    return { results: [], info: { count: 0, pages: 1, next: null, prev: null } };
  }
  const idsParam = ids.join(',');
  const response = await api.get(`/character/${idsParam}`);
  const results = Array.isArray(response.data) ? response.data : [response.data];
  return {
    results,
    info: {
      count: results.length,
      pages: 1,
      next: null,
      prev: null,
    },
  };
};