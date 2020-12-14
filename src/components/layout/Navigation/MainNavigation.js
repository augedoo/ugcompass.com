import React, {
  Fragment,
  useEffect,
  useState,
  useContext,
  useRef,
} from 'react';
import './Navigation.css';
import { Link } from 'react-router-dom';
import Logo from '../Logo/Logo';
import CategoriesMenu from '../CategoriesMenu/CategoriesMenu';
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
  const searchFormRef = useRef();

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

    // Close the search result dialog use click outside it
    const searchFormInactive = (e) => {
      if (searchFormRef.current) {
        if (searchFormRef.current.contains(e.target)) {
          return;
        }
      }
      setSearchTerm('');
    };

    document.addEventListener('click', searchFormInactive);

    return () => document.removeEventListener('click', searchFormInactive);
  }, [searchedFacilities]);

  const onLogout = () => {
    logout();
  };

  const authLinks = (
    <Fragment>
      <li className='username'>
        Hi {user && user.name}
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 20 20'
          fill='currentColor'
        >
          <path
            fillRule='evenodd'
            d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
            clipRule='evenodd'
          />
        </svg>
        <ul>
          <li>
            <a href='/user-settings'>Settings</a>
          </li>
          {user && (
            <Fragment>
              {user.role === 'admin' && (
                <li>
                  <a href='/admin-dashboard'>Admin</a>
                </li>
              )}
            </Fragment>
          )}
          <li>
            <a href='/about'>About</a>
          </li>
          {/* <li>
            <a href='#/terms'>Terms and Privacy</a>
          </li> */}
          <li className='logout' onClick={onLogout}>
            <a href='#!'>Logout</a>
          </li>
        </ul>
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
          <Logo />

          <CategoriesMenu />

          {isAuthenticated && (
            <form className='search-form' ref={searchFormRef}>
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
                      <sl-spinner></sl-spinner> Retrieving search results...
                    </div>
                  )}
                </ul>
              )}
            </form>
          )}

          <ul className='auth'>{isAuthenticated ? authLinks : guestLinks}</ul>
        </div>
      </div>
    </div>
  );
};

export default MainNavigation;
