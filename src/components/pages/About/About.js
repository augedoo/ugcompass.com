import './About.css';
import React, { useEffect, useContext } from 'react';
import AuthContext from '../../../context/auth/authContext';

const About = () => {
  const authContext = useContext(AuthContext);

  useEffect(() => {
    authContext.loadUser();
    // eslint-disable-next-line
  }, []);

  return (
    <div className='about-page'>
      <div className='about-wrapper'>
        <h1 className='title'>About this Application</h1>
        <p className='description'>
          Website to help student of University of Ghana navigate and
          familiarize themselves with all facilities on the various campuses.{' '}
        </p>

        <p className='version'>Version 1.0.0</p>
      </div>
    </div>
  );
};

export default About;
