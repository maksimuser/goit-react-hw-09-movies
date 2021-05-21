import { Component } from 'react';
import queryString from 'query-string';
import PropTypes from 'prop-types';
import Loader from 'react-loader-spinner';

import MoviesList from '../components/MoviesList';
import SearchForm from '../components/SearchForm';
import apiServices from '../api/api-services';

class MoviesPage extends Component {
  state = {
    movies: [],
    error: null,
    isLoading: false,
  };

  componentDidMount() {
    const { search } = this.props.location;
    const parsed = queryString.parse(search);

    if (parsed?.query) {
      this.setState({ isLoading: true });
      apiServices
        .fetchMovies(parsed.query)
        .then(results => this.setState({ movies: results }))
        .catch(error => this.setState(error))
        .finally(() => this.setState({ isLoading: false }));
    }
  }

  onSubmitChange = query => {
    this.setState({ isLoading: true });

    apiServices
      .fetchMovies(query)
      .then(results => this.setState({ movies: results }))
      .catch(error => this.setState(error))
      .finally(() => this.setState({ isLoading: false }));
  };

  render() {
    const { movies, error, isLoading } = this.state;

    return (
      <>
        {error && <p>Whoops, something went wrong: {error.message}</p>}
        <SearchForm onSubmit={this.onSubmitChange} />

        {isLoading && (
          <Loader type="ThreeDots" color="blue" height={80} width={80} />
        )}
        {movies && <MoviesList movies={movies} />}
      </>
    );
  }
}

MoviesPage.propTypes = {
  search: PropTypes.string,
};
export default MoviesPage;
