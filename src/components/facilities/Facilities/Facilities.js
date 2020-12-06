import './Facilities.css';
import React, { useContext, useEffect, Fragment } from 'react';
import FacilityItem from '../FacilityItem/FacilityItem';
import Spinner from '../../layout/Spinner/Spinner';

import AuthContext from '../../../context/auth/authContext';
import AlertContext from '../../../context/alert/alertContext';
import FacilitiesContext from '../../../context/facilities/facilitiesContext';

const FacilityList = () => {
  const authContext = useContext(AuthContext);
  const facilitiesContext = useContext(FacilitiesContext);
  const alertContext = useContext(AlertContext);
  const { getFacilities, facilities, error, loading } = facilitiesContext;
  const { setAlert } = alertContext;

  // Get facility when component load
  useEffect(() => {
    authContext.loadUser();
    getFacilities();

    if (error === 'Internal Server Error') {
      setAlert(
        error,
        'warning',
        'exclamation-triangle',
        'Please try again or refresh the page'
      );
    }
    // eslint-disable-next-line
  }, [error]);

  // No faclities to show
  if (facilities !== null && facilities.length === 0 && !loading) {
    return (
      <h4 className='empty-facilities-list'>
        Facilities have not been upload yet. Check in later.
      </h4>
    );
  }

  return (
    <Fragment>
      {facilities !== null && !loading ? (
        <div className='facilities-wrapper'>
          {facilities.map((facility) => {
            return <FacilityItem key={facility._id} facility={facility} />;
          })}
        </div>
      ) : (
        <div>
          <Spinner size={5} />
        </div>
      )}
    </Fragment>
  );
};

export default FacilityList;
