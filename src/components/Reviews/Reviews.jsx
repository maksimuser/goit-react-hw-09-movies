import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Loader from 'react-loader-spinner';

import apiServices from '../../api/api-services';
import ReviewsItem from '../ReviewsItem';

export default function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { movieId } = useParams();
  useEffect(() => {
    setIsLoading(true);

    apiServices
      .fetchReviews(movieId)
      .then(results => setReviews(results))
      .catch(error => setError(error))
      .finally(() => setIsLoading(false));
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
