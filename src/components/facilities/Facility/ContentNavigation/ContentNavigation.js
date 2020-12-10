import './ContentNavigation.css';
import React from 'react';
import { Link } from 'react-router-dom';

const ContentNavigation = () => {
  return (
    <nav className='facility__navigation'>
      <sl-card class='card-basic'>
        <ul>
          <li>
            <a href='#details'>Description</a>
          </li>
          <li>
            <a href='#photos'>Photos</a>
          </li>
          <li>
            <a href='#rooms'>Rooms</a>
          </li>
          <li>
            <a href='#reviews'>Reviews</a>
          </li>
        </ul>
      </sl-card>
    </nav>
  );
};

export default ContentNavigation;
