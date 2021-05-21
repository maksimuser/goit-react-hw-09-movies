import { useState } from 'react';
import { useHistory } from 'react-router-dom';

export default function SearchForm({ onSubmit }) {
  const [query, setQuery] = useState('');
  const history = useHistory();

  const handleChange = evt => {
    setQuery(evt.currentTarget.value);
  };

  const handleSubmit = evt => {
    evt.preventDefault();

    if (query) {
      onSubmit(query);
    } else {
      return alert('Enter something a word ');
    }

    history.push({
      search: `query=${query}`,
    });

    setQuery('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        <input value={query} type="text" onChange={handleChange} />
      </label>
      <button type="submit">Search</button>
    </form>
  );
}
