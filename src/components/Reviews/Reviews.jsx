import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import Loader from 'react-loader-spinner';

import apiServices from '../../api/api-services';
import ReviewsItem from '../ReviewsItem';

export default function Reviews() {
  const [reviews, setReviews] = useState([]);
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
      .fetchReviews(movieId, cancelKey)
      .then(results => setReviews(results))
      .catch(error => {
        if (axios.isCancel(error)) {
          console.log('Operation on page "Reviews" canceled by the user.');
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
      <ul>
        {isLoading ? (
          <Loader type="ThreeDots" color="blue" height={80} width={80} />
        ) : reviews.length > 0 ? (
          reviews.map(({ id, author, content }) => (
            <ReviewsItem key={id} author={author} content={content} />
          ))
        ) : (
          <span>We don't have any reviews for this movie</span>
        )}
      </ul>
    </>
  );
}
