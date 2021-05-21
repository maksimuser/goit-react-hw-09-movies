import MoviesItem from '../MoviesItem';

export default function MoviesList({ movies }) {
  return (
    <ul>
      {movies.map(movie => (
        <MoviesItem key={movie.id} movie={movie} />
      ))}
    </ul>
  );
}
