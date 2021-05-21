import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';

export default function ButtonGoBack() {
  const history = useHistory();
  const location = useLocation();

  const handleGoBack = () => {
    history.push(location?.state?.from || '/');
  };

  return (
    <button type="button" onClick={handleGoBack}>
      Go back
    </button>
  );
}
