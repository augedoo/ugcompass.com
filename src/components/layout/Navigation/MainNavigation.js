import React, { Fragment, useEffect, useState, useContext } from 'react';
import './Navigation.css';
import { ReactComponent as Logo } from '../../../assets/img/ugcompass_logo.svg';
import { Link } from 'react-router-dom';
import AuthContext from '../../../context/auth/authContext';

const MainNavigation = () => {
  const authContext = useContext(AuthContext);

  const { isAuthenticated, logout, user } = authContext;

  const [currentPage, setCurrentPage] = useState(window.location.pathname);

  useEffect(() => {
    // Listen for page change
    window.addEventListener('popstate', (e) => {
      setCurrentPage(window.location.pathname);
    });
  }, [currentPage]);

  const onLogout = () => {
    logout();
  };

  const authLinks = (
    <Fragment>
      <li className='username'>Hi {user && user.name.split(' ')[0]}</li>
      <li>
        <a className='logout' href='#!' onClick={onLogout}>
          Logout
        </a>
      </li>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <li>
        <Link to='/login'>Log In</Link>
      </li>
      <li>
        <Link to='/signup'>Sign Up</Link>
      </li>
    </Fragment>
  );

  const mainLinks = (
    <Fragment>
      <ul className='links'>
        <li>
          <Link to='/' className={currentPage === '/' ? 'current' : ''}>
            Home
          </Link>
        </li>
        <li>
          <Link
            to='/facilities'
            className={currentPage === '/facilities' ? 'current' : ''}
          >
            Facilities
          </Link>
        </li>
        <li>
          <Link
            to='/about'
            className={currentPage === '/about' ? 'current' : ''}
          >
            About
          </Link>
        </li>
      </ul>
    </Fragment>
  );

  return (
    <div className='navbar'>
      <div className='container'>
        <div className='navbar-wrapper'>
          <div className='logo'>
            <a href='/'>
              <Logo />
            </a>
          </div>

          {isAuthenticated && mainLinks}

          <ul className='auth'>{isAuthenticated ? authLinks : guestLinks}</ul>
        </div>
      </div>
    </div>
  );
};

export default MainNavigation;
