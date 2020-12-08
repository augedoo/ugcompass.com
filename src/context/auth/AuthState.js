import React, { useReducer } from 'react';
import axios from 'axios';
import ugCompass from '../apis/ugcompass';
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
  CLEAR_MESSAGES,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAIL,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAIL,
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
    message: null,
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
      console.log(err);
      // if (err.response.status && err.response.status === 500) {
      //   dispatch({ type: AUTH_ERROR, payload: err.response.statusText });
      // } else {
      //   dispatch({ type: AUTH_ERROR, payload: err.response.data.error });
      // }
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
      const { data } = await ugCompass.post('/auth/register', formData, config);
      dispatch({
        type: SIGNUP_SUCCESS,
        payload: data,
      });

      loadUser();
    } catch (err) {
      if (err.response.status === 500) {
        dispatch({ type: SIGNUP_FAIL, payload: err.response.statusText });
      } else {
        dispatch({ type: SIGNUP_FAIL, payload: err.response.data.error });
      }
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
      const { data } = await ugCompass.post('/auth/login', formData, config);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: data.token,
      });

      loadUser();
    } catch (err) {
      if (err.response.status === 500) {
        dispatch({ type: LOGIN_FAIL, payload: err.response.statusText });
      } else {
        dispatch({ type: LOGIN_FAIL, payload: err.response.data.error });
      }
    }
  };

  // Forgot Password
  const forgotPassword = async (email) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const { data } = await ugCompass.post(
        '/auth/forgotpassword',
        email,
        config
      );
      dispatch({ type: FORGOT_PASSWORD_SUCCESS, payload: data });
    } catch (err) {
      dispatch({
        type: FORGOT_PASSWORD_FAIL,
        payload: err.response.data.error,
      });
    }
  };

  // Reset Password
  const resetPassword = async (password, resetToken) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const formData = {
      password,
    };
    try {
      const { data } = await ugCompass.put(
        `/auth/resetpassword/${resetToken}`,
        formData,
        config
      );
      dispatch({ type: RESET_PASSWORD_SUCCESS, payload: data.token });
    } catch (err) {
      dispatch({
        type: RESET_PASSWORD_FAIL,
        payload: err.response.data.error,
      });
    }
  };

  // Logout
  const logout = () => dispatch({ type: LOGOUT });

  // Clear Errors
  const clearErrors = () => dispatch({ type: CLEAR_ERRORS });

  // Clear Messages
  const clearMessages = () => dispatch({ type: CLEAR_MESSAGES });

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user,
        message: state.message,
        error: state.error,
        signup,
        loadUser,
        login,
        logout,
        forgotPassword,
        resetPassword,
        clearErrors,
        clearMessages,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
