import PropTypes from 'prop-types';

const ReviewsItem = ({ author, content }) => (
  <li>
    <h5>Author: {author}</h5>
    <p>{content}</p>
  </li>
);

ReviewsItem.propTypes = {
  author: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};
export default ReviewsItem;
