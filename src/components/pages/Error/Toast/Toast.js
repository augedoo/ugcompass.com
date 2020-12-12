import './Toast.css';
import React from 'react';

const OffLine = ({ type, msg, subMsg }) => {
  return (
    <div className={`toast ${type ? 'toast--' + type : null}`}>
      <div className='toast__wrapper'>
        <div className='toast__message'>
          <strong>Lost Connection</strong>
        </div>
        <span className='toast__sub-message'>Trying to reconnect...</span>
      </div>
    </div>
  );
};

export default OffLine;
