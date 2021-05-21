import React, { Suspense, lazy } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import AppBar from './components/AppBar';
import routes from './routes';

const HomePage = lazy(() =>
  import('./pages/HomePage' /* webpackChunkName: "HomePage" */),
);
const MoviesPage = lazy(() =>
  import('./pages/MoviesPage' /* webpackChunkName: "MoviesPage" */),
);
const MoviesDetailsPage = lazy(() =>
  import(
    './pages/MoviesDetailsPage' /* webpackChunkName: "MoviesDetailsPage" */
  ),
);

const App = () => (
  <>
    <AppBar />
    <Suspense fallback={<h3>Loading page...</h3>}>
      <Switch>
        <Route exact path={routes.home} component={HomePage} />
        <Route exact path={routes.movies} component={MoviesPage} />
        <Route path={routes.moviesDetails} component={MoviesDetailsPage} />

        <Redirect to={routes.home} />
      </Switch>
    </Suspense>
  </>
);

export default App;
