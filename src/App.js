import './App.css';
import React, { Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Offline, Online } from 'react-detect-offline';
import MainNavigation from './components/layout/Navigation/MainNavigation.js';
import Home from './components/pages/Home/Home';
import About from './components/pages/About/About';
import Signup from './components/pages/Auth/Signup';
import Login from './components/pages/Auth/Login';
import ForgotPassword from './components/pages/Auth/ForgotPassword';
import ChangePassword from './components/pages/Auth/ChangePassword';
import OffLineContent from './components/pages/Error/OffLine/OffLine';
import NotFound from './components/pages/Error/NotFound';
import Facilities from './components/facilities/Facilities/Facilities';
import Facility from './components/facilities/Facility/Facility';
import Alerts from './components/layout/Alerts/Alerts';
import PrivateRoute from './components/routing/PrivateRoute';

import AuthState from './context/auth/AuthState';
import FacilitiesState from './context/facilities/FacilitiesState';
import AlertState from './context/alert/AlertState';

import setAuthToken from './utils/setAuthToken';

//Load token from global headers everytime the main component loads
if (localStorage.ugcompassToken) {
  setAuthToken(localStorage.ugcompassToken);
}

function App() {
  return (
    <Fragment>
      <Offline>
        <OffLineContent />
      </Offline>
      <Online>
        <AuthState>
          <AlertState>
            <FacilitiesState>
              <Router>
                <MainNavigation />
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
            </FacilitiesState>
          </AlertState>
        </AuthState>
      </Online>
    </Fragment>
  );
}

export default App;
