import './OffLine.css';
import { ReactComponent as Logo } from '../../../../assets/img/ugcompass_logo.svg';
import React from 'react';

const OffLine = () => {
  return (
    <div className='offline-content'>
      <div className='offline-content-wrapper'>
        <Logo />
        <h1>Looks like you are not connected to the internet</h1>
        <p>
          Please establish connection and to continue using your UGC
          <span style={{ color: '#D2A969' }}>O</span>MP
          <span style={{ color: '#D2A969' }}>A</span>SS.
        </p>
      </div>
    </div>
  );
};

export default OffLine;
