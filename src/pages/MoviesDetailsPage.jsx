import { useEffect, useReducer } from 'react';
import { useParams } from 'react-router-dom';

import Loader from 'react-loader-spinner';
import axios from 'axios';

import MovieDetails from '../components/MovieDetails';
import AdditionalInfo from '../components/AdditionalInfo';
import ButtonGoBack from '../components/ButtonGoBack';
import apiServices from '../api/api-services';
const initialState = {
  poster_path: '',
  release_date: '',
  first_air_date: '',
  title: '',
  original_name: '',
  vote_average: 0,
  overview: '',
  genres: [],
  id: 0,
  error: null,
  isLoading: false,
};

function movieDetailsReducer(state, { type, payload }) {
  switch (type) {
    case 'isLoading':
      return { ...state, isLoading: payload };
    case 'error':
      return { ...state, error: payload };
    case 'state':
      return { ...state, ...payload };

    default:
      throw new Error('Unsupported type action!');
  }
}
export default function MoviesDetailsPage() {
  const [state, dispatch] = useReducer(movieDetailsReducer, initialState);

  const { movieId } = useParams();

  useEffect(() => {
    const source = axios.CancelToken.source();
    const cancelKey = {
      cancelToken: source.token,
    };
    dispatch({ type: 'isLoading', payload: true });

    apiServices
      .fetchMovieDetails(movieId, cancelKey)
      .then(movieDetails => dispatch({ type: 'state', payload: movieDetails }))
      .catch(error => {
        if (axios.isCancel(error)) {
          console.log(
            'Operation on page "MoviesDetailsPage" canceled by the user.',
          );
        } else {
          dispatch({ type: 'error', payload: error.message });
        }
      })
      .finally(() => dispatch({ type: 'isLoading', payload: false }));

    return () => {
      source.cancel();
    };
  }, [movieId]);

  return (
    <div>
      <ButtonGoBack />

      <div className="infoMovie">
        {state.error && (
          <p>Whoops, something went wrong: {state.error.message}</p>
        )}
        <h2>Movie Details</h2>
        {state.isLoading && (
          <Loader type="ThreeDots" color="blue" height={80} width={80} />
        )}
        {state.poster_path && <MovieDetails {...state} />}
      </div>

      <AdditionalInfo id={state.id} />
    </div>
  );
}
