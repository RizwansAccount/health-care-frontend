import React from 'react'
import { KEYS, removeLocalStore } from '../constants';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../reactRoute/RouteConstants';

const HomePage = () => {
  const navigate = useNavigate();

  const fnLogout = async () => {
    removeLocalStore(KEYS.userId);
    removeLocalStore(KEYS.userToken);
    navigate(ROUTES.login);
  };

  return (
    <div>
      <p>
        HomePage
      </p>

      <button onClick={fnLogout}>
        Logout
      </button>
    </div>
  )
}

export default HomePage