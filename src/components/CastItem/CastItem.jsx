import PropTypes from 'prop-types';

import noPhoto from '../../images/no-photo.png';

const CastItem = ({ name, path, character }) => {
  const baseURL = 'https://image.tmdb.org/t/p/w300';
  const imgURL = baseURL + path;

  return (
    <li>
      <img src={path ? imgURL : noPhoto} alt={name} width="150" />
      <h3>{name}</h3>
      <p>Character: {character}</p>
    </li>
  );
};

CastItem.propTypes = {
  path: PropTypes.string,
  name: PropTypes.string.isRequired,
  character: PropTypes.string.isRequired,
};
export default CastItem;
