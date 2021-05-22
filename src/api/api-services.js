import axios from 'axios';

import { API_KEY } from './key';
axios.defaults.baseURL = 'https://api.themoviedb.org/';

const fetchTrendMovies = async cancelKey => {
  return await axios
    .get(`/3/trending/movie/day?api_key=${API_KEY}`, cancelKey)
    .then(res => res.data.results);
};

const fetchMovieDetails = async (movieId, cancelKey) => {
  return await axios
    .get(`/3/movie/${movieId}?api_key=${API_KEY}&language=en-US`, cancelKey)
    .then(res => res.data);
};

const fetchMovies = async (query, cancelKey) => {
  return await axios
    .get(
      `/3/search/movie?api_key=${API_KEY}&language=en-US&query=${query}&page=1&include_adult=false`,
      cancelKey,
    )
    .then(res => res.data.results);
};

const fetchCredits = async (movieId, cancelKey) => {
  const { data } = await axios.get(
    `/3/movie/${movieId}/credits?api_key=${API_KEY}&language=en-US`,
    cancelKey,
  );
  return data.cast;
};

const fetchReviews = async (movieId, cancelKey) => {
  return await axios
    .get(
      `/3/movie/${movieId}/reviews?api_key=${API_KEY}&language=en-US&page=1`,
      cancelKey,
    )
    .then(res => res.data.results);
};

const fetch = {
  fetchTrendMovies,
  fetchMovieDetails,
  fetchMovies,
  fetchCredits,
  fetchReviews,
};
export default fetch;
