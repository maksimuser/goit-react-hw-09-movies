import { Suspense, lazy } from 'react';
import { NavLink, Switch, Route, useLocation } from 'react-router-dom';

import routes from '../../routes';

import styles from './AdditionalInfo.module.scss';

const Cast = lazy(() => import('../Cast' /* webpackChunkName: "Cast" */));

const Reviews = lazy(() =>
  import('../Reviews' /* webpackChunkName: "Reviews" */),
);

export default function AdditionalInfo({ id }) {
  const location = useLocation();
  return (
    <>
      <h4>Additional information</h4>
      <nav className={styles.menu}>
        <NavLink
          className={styles.NavLink}
          activeClassName={styles.NavLink__active}
          to={{
            pathname: `/movies/${id}/cast`,
            state: { from: location?.state?.from },
          }}
        >
          Cast
        </NavLink>

        <NavLink
          className={styles.NavLink}
          activeClassName={styles.NavLink__active}
          to={{
            pathname: `/movies/${id}/reviews`,
            state: { from: location?.state?.from },
          }}
        >
          Reviews
        </NavLink>
      </nav>
      <Suspense fallback={<h3>Loading page...</h3>}>
        <Switch>
          <Route path={`${routes.moviesDetails}/cast`} component={Cast} />
          <Route path={`${routes.moviesDetails}/reviews`} component={Reviews} />
        </Switch>
      </Suspense>
    </>
  );
}
