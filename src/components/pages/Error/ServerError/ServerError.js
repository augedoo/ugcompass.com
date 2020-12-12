import './ServerError.css';
import { ReactComponent as Logo } from '../../../../assets/img/ugcompass_logo.svg';
import React from 'react';

const ServerError = () => {
  return (
    <div className='server-error'>
      <div className='server-error__wrapper'>
        <Logo />
        <h1>Internal server error</h1>
        <p>Please try again or refresh the page.</p>
      </div>
    </div>
  );
};

export default ServerError;
