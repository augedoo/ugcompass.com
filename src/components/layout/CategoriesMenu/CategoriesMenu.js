import './CategoriesMenu.css';
import React, { Fragment, useContext } from 'react';
import AuthContext from '../../context/auth/authContext';

const CategoriesMenu = () => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated } = authContext;

  const categories = [
    {
      type: 'All facilities',
    },
    {
      type: 'Study facilities',
      link: 'study',
    },
    {
      type: 'Classrooms',
      link: 'classroom',
    },
    {
      type: 'Office facilities',
      link: 'office',
    },
    {
      type: 'General use facilities',
      link: 'general_use',
    },
    {
      type: 'Labouratories',
      link: 'laboratory',
    },
    {
      type: 'Residential facilities',
      link: 'residential',
    },
    {
      type: 'Special use facilities',
      link: 'special_use',
    },
    {
      type: 'Leased facilities',
      link: 'leased',
    },
    {
      type: 'Support facilities',
      link: 'support',
    },
    {
      type: 'Others facilities',
      link: 'other',
    },
  ];

  return (
    <Fragment>
      {isAuthenticated && (
        <ul className='categories-menu'>
          <li>
            <div className='main'>
              <span className='icon'>
                <svg
                  className='w-6 h-6'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    fillRule='evenodd'
                    d='M3 7a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 13a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z'
                    clipRule='evenodd'
                  />
                </svg>
              </span>{' '}
              <span>Categories</span>
            </div>
            <ul>
              {categories.map((category) => (
                <li key={category.type}>
                  <a
                    href={
                      category.link
                        ? `/facilities/categories/${category.link}`
                        : '/facilities'
                    }
                  >
                    {category.type}
                  </a>
                </li>
              ))}
            </ul>
          </li>
        </ul>
      )}
    </Fragment>
  );
};

export default CategoriesMenu;
