import './ServerError.css';
import React, { Fragment } from 'react';

function ServerError() {
  return (
    <div className='sever-error'>
      <h1>Internal Server Error</h1>
      <p className='lead'>
        Something happened. Please wait for a while and refresh the page
      </p>
    </div>
  );
}

export default ServerError;
