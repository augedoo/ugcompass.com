import {
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS,
  CLEAR_MESSAGES,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAIL,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAIL,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_FAIL,
  UPDATE_DETAIL_SUCCESS,
  UPDATE_DETAIL_FAIL,
} from '../types';

const AuthReducer = (state, action) => {
  switch (action.type) {
    case USER_LOADED:
      return {
        ...state,
        token: localStorage.ugcompass_token,
        isAuthenticated: true,
        loading: false,
        user: action.payload.data,
      };

    case SIGNUP_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem('ugcompass_token', `Bearer ${action.payload}`);
      return {
        ...state,
        token: action.payload,
        isAuthenticated: true,
        loading: false,
      };

    case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        token: action.payload,
        message: 'Password Reset Successful',
        loading: false,
      };

    case FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        message: action.payload.data,
        loading: false,
      };

    case UPDATE_DETAIL_SUCCESS:
      return {
        ...state,
        user: action.payload.data,
        message: 'Detail updated successfully',
        loading: false,
      };
    case UPDATE_PASSWORD_SUCCESS:
      return {
        ...state,
        user: action.payload.data,
        message: 'Password updated successfully',
        loading: false,
      };

    case UPDATE_PASSWORD_FAIL:
    case UPDATE_DETAIL_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case SIGNUP_FAIL:
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT:
    case FORGOT_PASSWORD_FAIL:
    case RESET_PASSWORD_FAIL:
      localStorage.removeItem('ugcompass_token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
        message: null,
        error: action.payload,
      };

    case CLEAR_ERRORS:
    case CLEAR_MESSAGES:
      return {
        ...state,
        error: null,
        message: null,
      };

    default:
      return state;
  }
};

export default AuthReducer;
