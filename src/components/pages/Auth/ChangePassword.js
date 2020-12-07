import './Auth.css';
import { ReactComponent as Logo } from '../../../assets/img/ugcompass_logo.svg';
import React, { useState, useEffect, useContext } from 'react';

import AuthContext from '../../../context/auth/authContext';
import AlertContext from '../../../context/alert/alertContext';

const ChangePassword = (props) => {
  const authContext = useContext(AuthContext);
  const alertContext = useContext(AlertContext);

  const [password, setPassword] = useState('');
  const [currentError, setCurrentError] = useState(null);

  const {
    resetPassword,
    token,
    error,
    message,
    clearErrors,
    clearMessages,
  } = authContext;
  const { setAlert } = alertContext;

  useEffect(() => {
    // Redirect when authenticated
    if (token) {
      props.history.push('/login');
    }

    if (error === 'Invalid token') {
      setAlert(
        error,
        'danger',
        'exclamation-octagon',
        'Your token is either expired or invalid. Please go back and re-enter your email on the FORGOT PASSWORD page to get another email containing a new token.',
        10000
      );
      setCurrentError(error);
    }

    if (message === 'Password Reset Successful') {
      setAlert(
        message,
        'success',
        'check2-circle',
        'Please log in with your new password'
      );
    }

    clearErrors();
    clearMessages();

    //eslint-disable-next-line
  }, [error, message, token, props.history]);

  const onSubmit = (e) => {
    e.preventDefault();

    let resetToken;

    if (props.match.params.resetToken) {
      resetToken = props.match.params.resetToken;
      resetPassword(password, resetToken);
    } else {
      setAlert(
        'Could not find reset token',
        'danger',
        'exclamation-octagon',
        'Your URL might be tampered with.',
        10000
      );
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <div className='form-wrapper'>
        <div className='logo'>
          <Logo />
        </div>
        <div className='form-group'>
          <label htmlFor='password'>New Password</label>
          <input
            type='password'
            id='password'
            name='password'
            placeholder='Enter new password'
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength='6'
          />
        </div>
        <div className='form-group'>
          <button type='submit'>Reset Password</button>
        </div>

        {currentError && currentError === 'Invalid token' ? (
          <div className='form-group'>
            <a className='go-back' href='/forgotpassword'>
              Go Back
            </a>
          </div>
        ) : null}
      </div>
    </form>
  );
};

export default ChangePassword;
