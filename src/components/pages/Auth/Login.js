import './Auth.css';
import { ReactComponent as Logo } from '../../../assets/img/ugcompass_logo.svg';
import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';

import AuthContext from '../../../context/auth/authContext';
import AlertContext from '../../../context/alert/alertContext';

const Login = (props) => {
  const authContext = useContext(AuthContext);
  const alertContext = useContext(AlertContext);

  const { isAuthenticated, login, error, clearErrors } = authContext;
  const { setAlert } = alertContext;

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  useEffect(() => {
    // Redirect when authenticated
    if (isAuthenticated) {
      props.history.push('/');
    }

    // Alert if user already exist
    if (
      error === 'Invalid credentials' ||
      error === 'Please provide an email and password'
    ) {
      setAlert(error, 'danger', 'exclamation-octagon');
    }
    clearErrors();

    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    login(formData);
  };

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
        <div className='form-group forgot-password'>
          <Link to='/forgotpassword'>Forgot Password?</Link>
        </div>
        <div className='form-group'>
          <input type='submit' value='Log In' />
        </div>
        <div className='existing-account'>
          Don't have an account? <a href='/signup'>Sign Up</a>
        </div>
      </div>
    </form>
  );
};

export default Login;
