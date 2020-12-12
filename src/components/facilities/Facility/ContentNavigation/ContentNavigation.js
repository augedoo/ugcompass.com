import './ContentNavigation.css';
import React from 'react';
import { Link } from 'react-scroll';

const ContentNavigation = () => {
  console.log('PAGE RE-RENDERING');

  return (
    <nav className='facility__navigation'>
      <sl-card class='card-basic'>
        <ul>
          <li>
            <Link
              activeClass='active'
              to='details'
              spy={true}
              smooth={false}
              offset={-80}
              duration={500}
            >
              Description
            </Link>
          </li>
          <li>
            <Link
              activeClass='active'
              to='photos'
              spy={true}
              smooth={false}
              offset={-80}
              duration={500}
            >
              Photos
            </Link>
          </li>
          <li>
            <Link
              activeClass='active'
              to='rooms'
              spy={true}
              smooth={false}
              offset={-80}
              duration={500}
            >
              Rooms
            </Link>
          </li>
          <li>
            <Link
              activeClass='active'
              to='reviews'
              spy={true}
              smooth={false}
              offset={-80}
              duration={500}
            >
              Reviews
            </Link>
          </li>
        </ul>
      </sl-card>
    </nav>
  );
};

export default ContentNavigation;
