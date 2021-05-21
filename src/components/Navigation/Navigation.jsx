import { NavLink } from 'react-router-dom';
import routes from '../../routes';
import styles from './Navigation.module.scss';

const Navigation = () => {
  return (
    <nav className={styles.menu}>
      <NavLink
        exact
        className={styles.NavLink}
        activeClassName={styles.NavLink__active}
        to={routes.home}
      >
        Home
      </NavLink>

      <NavLink
        className={styles.NavLink}
        activeClassName={styles.NavLink__active}
        to={routes.movies}
      >
        Movies
      </NavLink>
    </nav>
  );
};
export default Navigation;
