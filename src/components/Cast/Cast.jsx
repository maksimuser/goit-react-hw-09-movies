import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Loader from 'react-loader-spinner';

import apiServices from '../../api/api-services';
import CastItem from '../CastItem';

export default function Cast() {
  const [actor, setActor] = useState({});
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { movieId } = useParams();

  useEffect(() => {
    const source = axios.CancelToken.source();
    const cancelKey = {
      cancelToken: source.token,
    };
    setIsLoading(true);

    apiServices
      .fetchCredits(movieId, cancelKey)
      .then(cast => setActor(cast))
      .catch(error => {
        if (axios.isCancel(error)) {
          console.log('Operation on page "Cast" canceled by the user.');
        } else {
          setError(error.message);
        }
      })
      .finally(() => setIsLoading(false));

    return () => {
      source.cancel();
    };
  }, [movieId]);

  return (
    <>
      {error && <p>Whoops, something went wrong: {error.message}</p>}
      {isLoading ? (
        <Loader type="ThreeDots" color="blue" height={80} width={80} />
      ) : actor.length > 0 ? (
        actor.map(({ name, profile_path, cast_id, character }) => {
          return (
            <CastItem
              key={cast_id}
              name={name}
              path={profile_path}
              character={character}
            />
          );
        })
      ) : (
        <span>No cast</span>
      )}
    </>
  );
}
