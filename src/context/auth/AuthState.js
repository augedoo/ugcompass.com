import React, { useReducer } from 'react';
import axios from 'axios';
import AuthContext from './authContext';
import authReducer from './authReducer';
import setAuthToken from '../../utils/setAuthToken';
import {
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  CLEAR_ERRORS,
  LOGOUT,
} from '../types';

const AuthState = (props) => {
  // Create initial state
  const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null,
    error: null,
  };

  // Init Reducer
  const [state, dispatch] = useReducer(authReducer, initialState);

  //===============
  // Actions
  //===============

  // Load User
  const loadUser = async () => {
    //Load token from global headers
    if (localStorage.ugcompass_token) {
      setAuthToken(localStorage.ugcompass_token);
    }

    try {
      const { data } = await axios.get(
        'https://ugcompass.herokuapp.com/api/v1/auth/me'
      );

      dispatch({
        type: USER_LOADED,
        payload: data,
      });
    } catch (err) {
      dispatch({
        type: AUTH_ERROR,
        payload: err.response.data.error,
      });
    }
  };

  // signup User
  const signup = async (formData) => {
    console.log(formData);
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const { data } = await axios.post(
        'https://ugcompass.herokuapp.com/api/v1/auth/register',
        formData,
        config
      );
      dispatch({
        type: SIGNUP_SUCCESS,
        payload: data,
      });

      loadUser();
    } catch (err) {
      console.log(err.response.data.error);
      return;
      dispatch({
        type: SIGNUP_FAIL,
        payload: err.response.data.error,
      });
    }
  };

  // Login User
  const login = async (formData) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const { data } = await axios.post(
        'https://ugcompass.herokuapp.com/api/v1/auth/login',
        formData,
        config
      );
      dispatch({
        type: LOGIN_SUCCESS,
        payload: data.token,
      });

      loadUser();
    } catch (err) {
      console.log(err.response.data.error);
      dispatch({
        type: LOGIN_FAIL,
        payload: err.response.data.error,
      });
    }
  };

  // Logout
  const logout = () => dispatch({ type: LOGOUT });

  // Clear Errors
  const clearErrors = () => dispatch({ type: CLEAR_ERRORS });

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user,
        error: state.error,
        signup,
        loadUser,
        login,
        logout,
        clearErrors,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
