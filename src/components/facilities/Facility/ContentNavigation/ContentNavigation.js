import './ContentNavigation.css';
import React from 'react';
import { Link } from 'react-scroll';

const ContentNavigation = ({ facility }) => {
  const { rooms } = facility;

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
          {/* Todo: Hide this link if facility have no photo */}
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
          {rooms.length > 0 && (
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
          )}
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
