import './UserSettings.css';
import '../../pages/Auth/Auth.css';
import React, { useEffect, useContext, useState } from 'react';
import Spinner from '../../layout/Spinner/Spinner';

import AuthContext from '../../../context/auth/authContext';
import AlertContext from '../../../context/alert/alertContext';

const UserSettings = () => {
  const authContext = useContext(AuthContext);
  const alertContext = useContext(AlertContext);
  const {
    user,
    loadUser,
    updateUserPassword,
    updateUserDetail,
    loading,
    message,
    error,
    clearMessages,
    clearErrors,
  } = authContext;
  const { setAlert } = alertContext;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    currentPassword: '',
    newPassword: '',
  });

  useEffect(() => {
    if (!user) {
      loadUser();
    }

    if (user) {
      setFormData(() => ({
        ...formData,
        name: user.name,
        email: user.email,
      }));
    }

    // Alert if user info update is successful
    if (
      message === 'Detail updated successfully' ||
      message === 'Password updated successfully'
    ) {
      setAlert(message, 'success', 'check2-circle');
    }

    // Alert if update is unsuccesful
    if (
      error === 'Please add an email' ||
      error === 'Please add a name' ||
      error === 'Password is incorrect.' ||
      error === 'Password should be at least 6 characters' ||
      error === 'Please add a password'
    ) {
      setAlert(error, 'danger', 'exclamation-octagon');
    }

    return () => {
      clearMessages();
      clearErrors();
    };
    // eslint-disable-next-line
  }, [loading, message, error]);

  const onInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const updateDetail = (e) => {
    e.preventDefault();
    const { name, email } = formData;
    updateUserDetail(name, email);
  };

  const updatePassword = (e) => {
    e.preventDefault();
    const { currentPassword, newPassword } = formData;
    updateUserPassword(currentPassword, newPassword);
  };

  return (
    <div className='user_settings'>
      <div className='user_settings__wrapper'>
        <h1>Preferrences</h1>
        <sl-tab-group placement='left'>
          <sl-tab slot='nav' panel='profile'>
            Your Profile
          </sl-tab>
          <sl-tab slot='nav' panel='details'>
            Update Details
          </sl-tab>
          <sl-tab slot='nav' panel='password'>
            Update Password
          </sl-tab>
          <sl-tab slot='nav' panel='disabled' disabled>
            More Settings
          </sl-tab>

          {/* Profile */}
          <sl-tab-panel name='profile'>
            {user ? (
              <div className='profile'>
                <div className='form-group'>
                  <p className='label'>Name</p>
                  <p>{user.name}</p>
                </div>
                <div className='form-group'>
                  <p className='label'>Email</p>
                  <p>{user.email}</p>
                </div>
                <div className='form-group'>
                  <p className='label'>Role</p>
                  <p>{user.role}</p>
                </div>
              </div>
            ) : (
              <Spinner />
            )}
          </sl-tab-panel>

          {/* Details */}
          <sl-tab-panel name='details'>
            {user ? (
              <form onSubmit={updateDetail}>
                <label htmlFor='name'>Name</label>
                <input
                  id='name'
                  onChange={onInputChange}
                  type='text'
                  placeholder='Enter new name'
                  name='name'
                  value={formData.name}
                />
                <div className='help-text'>
                  People will identify your reviews of facilities with this
                  name.
                </div>
                <br />
                <label htmlFor='email'>Email</label>
                <input
                  onChange={onInputChange}
                  id='email'
                  type='email'
                  name='email'
                  value={formData.email}
                  placeholder='new.email@example.com'
                />
                <div className='help-text'>
                  Please don't modify your email if you don't want to change it.
                </div>
                <br />
                <br />
                <button type='submit'>Update My Credentials</button>
              </form>
            ) : (
              <Spinner />
            )}
          </sl-tab-panel>

          {/* Password */}
          <sl-tab-panel name='password'>
            <form onSubmit={updatePassword}>
              <label htmlFor='currentPassword'>Current Password</label>
              <input
                onChange={onInputChange}
                type='password'
                placeholder='Enter your current password'
                id='currentPassword'
                name='currentPassword'
                minLength='6'
                required={true}
              />
              <br />
              <label htmlFor='newPassword'>New Password</label>
              <input
                onChange={onInputChange}
                type='password'
                id='newPassword'
                name='newPassword'
                placeholder='Enter new password'
                minLength='6'
                required={true}
              />
              <br />
              <br />
              <button type='submit'>Update My Password</button>
            </form>
          </sl-tab-panel>

          <sl-tab-panel name='disabled'>This is a disabled panel.</sl-tab-panel>
        </sl-tab-group>
      </div>
    </div>
  );
};

export default UserSettings;
