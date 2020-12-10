import React, { useContext, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';
import AlertContext from '../../context/alert/alertContext';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const authContext = useContext(AuthContext);
  const alertContext = useContext(AlertContext);
  const { isAuthenticated, loading, error } = authContext;
  const { setAlert } = alertContext;

  useEffect(() => {
    if (error === 'Not authorized to access this route') {
      setAlert(
        'You are not authorized to access resource.',
        'danger',
        'exclamation-octagon',
        'Please login or signup.'
      );
    }

    // eslint-disable-next-line
  }, [error]);

  return (
    <Route
      {...rest}
      render={(props) =>
        !isAuthenticated && !loading ? (
          <Redirect to='/login' />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default PrivateRoute;
