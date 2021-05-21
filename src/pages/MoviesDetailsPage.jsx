import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loader from 'react-loader-spinner';

import MovieDetails from '../components/MovieDetails';
import AdditionalInfo from '../components/AdditionalInfo';
import ButtonGoBack from '../components/ButtonGoBack';
import apiServices from '../api/api-services';

class MoviesDetailsPage extends Component {
  state = {
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

  componentDidMount() {
    const { movieId } = this.props.match.params;
    this.setState({ isLoading: true });
    apiServices
      .fetchMovieDetails(movieId)
      .then(movieDetails => this.setState({ ...movieDetails }))
      .catch(error => this.setState(error))
      .finally(() => this.setState({ isLoading: false }));
  }

  render() {
    const { poster_path, id, error, isLoading } = this.state;

    return (
      <div>
        <ButtonGoBack />

        <div className="infoMovie">
          {error && <p>Whoops, something went wrong: {error.message}</p>}
          <h2>Movie Details</h2>
          {isLoading && (
            <Loader type="ThreeDots" color="blue" height={80} width={80} />
          )}
          {poster_path && <MovieDetails {...this.state} />}
        </div>

        <AdditionalInfo id={id} />
      </div>
    );
  }
}

MoviesDetailsPage.propTypes = {
  movieId: PropTypes.string,
};

export default MoviesDetailsPage;
