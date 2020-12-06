import React, { Fragment, useEffect, useState, useContext } from 'react';
import './Navigation.css';
import { ReactComponent as Logo } from '../../../assets/img/ugcompass_logo.svg';
import { Link } from 'react-router-dom';
import AuthContext from '../../../context/auth/authContext';
import FacilitiesContext from '../../../context/facilities/facilitiesContext';

const MainNavigation = () => {
  const authContext = useContext(AuthContext);
  const facilitiesContext = useContext(FacilitiesContext);

  const { isAuthenticated, logout, user } = authContext;
  const { loading, searchFacility, searchedFacilities } = facilitiesContext;

  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(null);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    let timer;
    if (searchTerm !== '') {
      timer = setTimeout(() => {
        setSearchResults(null);
        setDebouncedSearchTerm(searchTerm);
      }, 500);
    }
    return () => {
      clearTimeout(timer);
    };

    // eslint-disable-next-line
  }, [searchTerm]);

  useEffect(() => {
    const onSearch = (term) => {
      if (term && term !== '') {
        searchFacility(term);
      }
    };

    onSearch(debouncedSearchTerm);
    // eslint-disable-next-line
  }, [debouncedSearchTerm]);

  useEffect(() => {
    if (searchedFacilities !== null) {
      setSearchResults(searchedFacilities);
    }
  }, [searchedFacilities]);

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

  // Clear search results when one is selected
  const onResultClick = () => {
    setSearchTerm('');
    setSearchResults([]);
  };

  return (
    <div className='navbar'>
      <div className='container'>
        <div className='navbar-wrapper'>
          <div className='logo'>
            <a href='/'>
              <Logo />
            </a>
          </div>

          <form className='search-form'>
            <input
              type='text'
              placeholder='Search for a place'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            {/* Display search results */}
            {searchTerm !== '' && (
              <ul className='search-result'>
                {searchedFacilities !== null && !loading ? (
                  <Fragment>
                    {/* this will render when the is some results for the search */}
                    {searchResults &&
                      searchResults.length !== 0 &&
                      searchResults.map((result) => (
                        <li key={result.id}>
                          <Link
                            to={`/facilities/${result.id}`}
                            onClick={onResultClick}
                          >
                            {result.name}
                          </Link>
                        </li>
                      ))}

                    {/* This is to clear the previous search result  */}
                    {searchResults === null && (
                      <div className='spinner-container'>
                        <sl-spinner></sl-spinner> Retriving search results...
                      </div>
                    )}

                    {/* This will display when we found nothing for the search */}
                    {searchResults && searchResults.length === 0 && (
                      <div className='no-result'>Nothing Found</div>
                    )}
                  </Fragment>
                ) : (
                  // This spinner will display when searchFacilities is null and loading is true
                  <div className='spinner-container'>
                    <sl-spinner></sl-spinner> Retriving search results...
                  </div>
                )}
              </ul>
            )}
          </form>

          <ul className='auth'>{isAuthenticated ? authLinks : guestLinks}</ul>
        </div>
      </div>
    </div>
  );
};

export default MainNavigation;
