import React, { Component } from 'react';
import Loader from 'react-loader-spinner';
import apiServices from '../api/api-services';
import MoviesList from '../components/MoviesList';

export default class HomePage extends Component {
  state = {
    movies: [],
    error: null,
    isLoading: false,
  };

  componentDidMount() {
    this.setState({ isLoading: true });

    apiServices
      .fetchTrendMovies()
      .then(trendMovies => this.setState({ movies: trendMovies }))
      .catch(error => this.setState(error))
      .finally(() => this.setState({ isLoading: false }));
  }

  render() {
    const { movies, error, isLoading } = this.state;

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
}
