import React, { Fragment, useEffect, useContext } from 'react';
import FacilityList from '../../facilities/FacilityList/FacityList';
import AuthContext from '../../../context/auth/authContext';

const Facilities = () => {
  const authContext = useContext(AuthContext);

  useEffect(() => {
    authContext.loadUser();
    // eslint-disable-next-line
  }, []);

  return (
    <Fragment>
      <FacilityList />
    </Fragment>
  );
};

export default Facilities;
