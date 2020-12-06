import './Auth.css';
import { ReactComponent as Logo } from '../../../assets/img/ugcompass_logo.svg';
import React, { useState } from 'react';

const ChangePassword = () => {
  const [password, setPassword] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(password);
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
          <input type='submit' value='Reset Password' />
        </div>
      </div>
    </form>
  );
};

export default ChangePassword;
