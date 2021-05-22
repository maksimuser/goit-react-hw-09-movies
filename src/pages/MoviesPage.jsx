import { useReducer, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import axios from 'axios';
import Loader from 'react-loader-spinner';

import MoviesList from '../components/MoviesList';
import SearchForm from '../components/SearchForm';
import apiServices from '../api/api-services';

const initialState = {
  movies: [],
  error: null,
  isLoading: false,
};
function moviesPageReducer(state, { type, payload }) {
  switch (type) {
    case 'isLoading':
      return { ...state, isLoading: payload };
    case 'error':
      return { ...state, error: payload };
    case 'movies':
      return { ...state, movies: payload };

    default:
      throw new Error('Unsupported type action!');
  }
}

export default function MoviesPage() {
  const [state, dispatch] = useReducer(moviesPageReducer, initialState);
  const { search } = useLocation();

  useEffect(() => {
    const source = axios.CancelToken.source();
    const cancelKey = {
      cancelToken: source.token,
    };

    const { query } = queryString.parse(search);

    if (query) {
      dispatch({ type: 'isLoading', payload: true });
      apiServices
        .fetchMovies(query, cancelKey)
        .then(results => dispatch({ type: 'movies', payload: results }))
        .catch(error => {
          if (axios.isCancel(error)) {
            console.log('Operation on page "MoviesPage" canceled by the user.');
          } else {
            dispatch({ type: 'error', payload: error.message });
          }
        })
        .finally(() => dispatch({ type: 'isLoading', payload: false }));
    }
    return () => {
      source.cancel();
    };
  }, [search]);

  const onSubmitChange = query => {
    console.log('oSC');
    const source = axios.CancelToken.source();
    const cancelKey = {
      cancelToken: source.token,
    };
    dispatch({ type: 'isLoading', payload: true });
    apiServices
      .fetchMovies(query, cancelKey)
      .then(results => dispatch({ type: 'movies', payload: results }))
      .catch(error => {
        if (axios.isCancel(error)) {
          console.log('Operation on page "MoviesPage" canceled by the user.');
        } else {
          dispatch({ type: 'error', payload: error.message });
        }
      })
      .finally(() => dispatch({ type: 'isLoading', payload: false }));

    return () => {
      source.cancel();
    };
  };

  return (
    <>
      {state.error && (
        <p>Whoops, something went wrong: {state.error.message}</p>
      )}
      <SearchForm onSubmit={onSubmitChange} />

      {state.isLoading && (
        <Loader type="ThreeDots" color="blue" height={80} width={80} />
      )}
      {state.movies && <MoviesList movies={state.movies} />}
    </>
  );
}
