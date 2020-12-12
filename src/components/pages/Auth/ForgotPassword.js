import './Auth.css';
import { ReactComponent as Logo } from '../../../assets/img/ugcompass_logo.svg';
import React, { useState, useContext, useEffect } from 'react';

import AuthContext from '../../../context/auth/authContext';
import AlertContext from '../../../context/alert/alertContext';

const ForgotPassword = () => {
  const authContext = useContext(AuthContext);
  const alertContext = useContext(AlertContext);
  const {
    forgotPassword,
    message,
    error,
    clearErrors,
    clearMessages,
  } = authContext;
  const { setAlert } = alertContext;

  const [email, setEmail] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    forgotPassword({ email });
  };

  useEffect(() => {
    if (message === 'Email Sent') {
      setAlert(
        message + ' Successfully',
        'success',
        'check2-circle',
        'Please check you inbox for a link to reset your password',
        20000
      );
    }
    if (error === 'Email could not be sent') {
      setAlert(
        error,
        'danger',
        'exclamation-octagon',
        'Please check you email and try again',
        10000
      );
    }
    if (error === 'No user with that email') {
      setAlert(
        error,
        'danger',
        'exclamation-octagon',
        'Please check you email and try again',
        10000
      );
    }

    return () => {
      clearErrors();
      clearMessages();
    };
  }, [message, error]);

  return (
    <form onSubmit={onSubmit}>
      <div className='form-wrapper'>
        <div className='logo'>
          <Logo />
        </div>
        <div className='form-group'>
          <label htmlFor='email'>Email</label>
          <input
            type='email'
            id='email'
            name='email'
            placeholder='Enter your email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className='form-group'>
          <button type='submit'>Reset Password</button>
        </div>
        <div className='existing-account'>
          <a href='/login'>Back To Login</a>
        </div>
      </div>
    </form>
  );
};

export default ForgotPassword;
