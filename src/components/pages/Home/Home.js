import './Home.css';
import React, { useEffect, useContext } from 'react';
import AuthContext from '../../../context/auth/authContext';

const Home = () => {
  const authContext = useContext(AuthContext);

  useEffect(() => {
    authContext.loadUser();
    // eslint-disable-next-line
  }, []);

  return (
    <div className='homepage'>
      <h1>Welcome To UGCompass</h1>
    </div>
  );
};

export default Home;
