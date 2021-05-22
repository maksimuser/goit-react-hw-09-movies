import { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from 'react-loader-spinner';
import apiServices from '../api/api-services';

import MoviesList from '../components/MoviesList';

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const source = axios.CancelToken.source();
    const cancelKey = {
      cancelToken: source.token,
    };

    setIsLoading(true);

    apiServices
      .fetchTrendMovies(cancelKey)
      .then(trendMovies => setMovies(trendMovies))
      .catch(error => {
        if (axios.isCancel(error)) {
          console.log('Operation on page "HomePage" canceled by the user.');
        } else {
          setError(error.message);
        }
      })
      .finally(() => setIsLoading(false));

    return () => {
      source.cancel();
    };
  }, []);

  return (
    <>
      {error && <p>Whoops, something went wrong: {error.message}</p>}
      <h1>Trending today</h1>
      {isLoading && (
        <Loader type="ThreeDots" color="blue" height={80} width={80} />
      )}
      {movies && <MoviesList movies={movies} />}
    </>
  );
}
