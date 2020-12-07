import './Auth.css';
import { ReactComponent as Logo } from '../../../assets/img/ugcompass_logo.svg';
import React, { useState, useContext, useEffect } from 'react';

import AuthContext from '../../../context/auth/authContext';
import AlertContext from '../../../context/alert/alertContext';

const Signup = (props) => {
  const authContext = useContext(AuthContext);
  const alertContext = useContext(AlertContext);
  const { isAuthenticated, signup, error, clearErrors } = authContext;
  const { setAlert } = alertContext;

  useEffect(() => {
    // Redirect when authenticated
    if (isAuthenticated) {
      props.history.push('/');
    }

    // Alert if user already exist
    if (
      error === 'Duplicate field value entered' ||
      error === 'Please add a name' ||
      error === 'Please add an email' ||
      error === 'Please add a valid email' ||
      error === 'Please add a password' ||
      error === 'Password should be at least 6 characters'
    ) {
      setAlert(error, 'danger', 'exclamation-octagon');
    }

    clearErrors();

    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const { password, confirmPassword } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setAlert('Passwords do not match.', 'danger', 'exclamation-octagon');
    } else {
      delete formData.confirmPassword;
      signup(formData);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <div className='form-wrapper'>
        <div className='logo'>
          <Logo />
        </div>
        <div className='form-group'>
          <label htmlFor='name'>Full Name</label>
          <input
            type='text'
            id='name'
            name='name'
            placeholder='Enter your name'
            onChange={onChange}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='email'>Email</label>
          <input
            type='email'
            id='email'
            name='email'
            placeholder='Enter your email'
            onChange={onChange}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            id='password'
            name='password'
            placeholder='Enter your password'
            onChange={onChange}
            required
            minLength='6'
          />
        </div>
        <div className='form-group'>
          <label htmlFor='confirmPassword'>Confirm Password</label>
          <input
            type='password'
            id='confirmPassword'
            name='confirmPassword'
            placeholder='Re-enter password'
            onChange={onChange}
            required
            minLength='6'
          />
        </div>
        <div className='form-group'>
          <button type='submit'>Sign Up</button>
        </div>
        <div className='existing-account'>
          Already have an account? <a href='/login'>Log In</a>
        </div>
      </div>
    </form>
  );
};

export default Signup;
