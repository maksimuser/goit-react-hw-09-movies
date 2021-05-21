import { Link, useLocation } from 'react-router-dom';

import styles from './MoviesItem.module.scss';

export default function MoviesItem({ movie }) {
  const location = useLocation();
  return (
    <Link
      className={styles.Link}
      to={{
        pathname: `/movies/${movie.id}`,
        state: { from: location },
      }}
    >
      {movie.title}
    </Link>
  );
}
