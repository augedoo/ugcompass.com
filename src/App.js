import './App.css';
import React, { Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Offline } from 'react-detect-offline';

import Home from './components/pages/Home/Home';
import Login from './components/pages/Auth/Login';
import Signup from './components/pages/Auth/Signup';
import About from './components/pages/About/About';
import NotFound from './components/pages/Error/NotFound';
import ForgotPassword from './components/pages/Auth/ForgotPassword';
import ChangePassword from './components/pages/Auth/ChangePassword';
import Dashboard from './components/pages/Admin/Dashboard';
import UserSettings from './components/pages/UserSettings/UserSettings';

import Toast from './components/pages/Error/Toast/Toast';
import MainNavigation from './components/layout/Navigation/MainNavigation.js';
import Alerts from './components/layout/Alerts/Alerts';
import Facility from './components/facilities/Facility/Facility';
import Facilities from './components/facilities/Facilities/Facilities';
import PrivateRoute from './components/routing/PrivateRoute';

import AuthState from './context/auth/AuthState';
import FacilitiesState from './context/facilities/FacilitiesState';
import ReviewsState from './context/reviews/ReviewsState';
import AlertState from './context/alert/AlertState';

import setAuthToken from './utils/setAuthToken';

//Load token from global headers everytime the main component loads
if (localStorage.ugcompassToken) {
  setAuthToken(localStorage.ugcompassToken);
}

function App() {
  return (
    <Fragment>
      <AuthState>
        <AlertState>
          <FacilitiesState>
            <ReviewsState>
              <Router>
                <MainNavigation />
                <Offline>
                  <Toast
                    type='danger'
                    msg='Connection is interrupted.'
                    subMsg='Trying to reconnect...'
                  />
                </Offline>
                <div className='container'>
                  <Alerts />
                  <Switch>
                    <PrivateRoute exact path='/' component={Home} />
                    <PrivateRoute
                      exact
                      path='/facilities'
                      component={Facilities}
                    />
                    <PrivateRoute
                      exact
                      path='/facilities/categories/:category'
                      component={Facilities}
                    />
                    <PrivateRoute
                      exact
                      path='/facilities/:facilityId'
                      component={Facility}
                    />
                    <PrivateRoute
                      exact
                      path='/admin-dashboard'
                      component={Dashboard}
                    />
                    <PrivateRoute
                      exact
                      path='/user-settings'
                      component={UserSettings}
                    />
                    <PrivateRoute exact path='/about' component={About} />
                    <Route exact path='/login' component={Login} />
                    <Route exact path='/signup' component={Signup} />
                    <Route
                      exact
                      path='/forgotpassword'
                      component={ForgotPassword}
                    />
                    <Route
                      exact
                      path='/changepassword/:resetToken'
                      component={ChangePassword}
                    />
                    <Route component={NotFound} />
                  </Switch>
                </div>
              </Router>
            </ReviewsState>
          </FacilitiesState>
        </AlertState>
      </AuthState>
    </Fragment>
  );
}

export default App;
