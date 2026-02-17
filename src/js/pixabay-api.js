import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api';
const API_KEY = import.meta.env.VITE_PIXABEY_KEY;
export const perPage = 15;
axios.defaults.baseURL = BASE_URL;

export async function request(query, page) {
  const response = await axios({
    url: BASE_URL,
    method: 'get',
    params: {
      key: API_KEY,
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page,
      per_page: perPage,
    },
  });
  return response.data;
}
