import React, { useEffect, useContext } from 'react';
import AuthContext from '../../../context/auth/authContext';

const About = () => {
  const authContext = useContext(AuthContext);

  useEffect(() => {
    authContext.loadUser();
    // eslint-disable-next-line
  }, []);

  return <div>About Page</div>;
};

export default About;
