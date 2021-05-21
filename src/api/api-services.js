import axios from 'axios';

import { API_KEY } from './key';
axios.defaults.baseURL = 'https://api.themoviedb.org/';

const fetchTrendMovies = async () => {
  return await axios
    .get(`/3/trending/movie/day?api_key=${API_KEY}`)
    .then(res => res.data.results);
};

const fetchMovieDetails = async movieId => {
  return await axios
    .get(`/3/movie/${movieId}?api_key=${API_KEY}&language=en-US`)
    .then(res => res.data);
};

const fetchMovies = async query => {
  return await axios
    .get(
      `/3/search/movie?api_key=${API_KEY}&language=en-US&query=${query}&page=1&include_adult=false`,
    )
    .then(res => res.data.results);
};

const fetchCredits = async movieId => {
  try {
    const { data } = await axios.get(
      `/3/movie/${movieId}/credits?api_key=${API_KEY}&language=en-US`,
    );
    return data.cast;
  } catch (error) {
    throw new Error('ERROR');
  }
};

const fetchReviews = async movieId => {
  return await axios
    .get(`/3/movie/${movieId}/reviews?api_key=${API_KEY}&language=en-US&page=1`)
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
