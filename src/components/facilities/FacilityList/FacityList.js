import './FacilityList.css';
import React, { useContext, useEffect } from 'react';
import FacilityItem from '../FacilityItem/FacilityItem';
import FacilitiesContext from '../../../context/facilities/facilitiesContext';

const FacilityList = () => {
  const facilitiesContext = useContext(FacilitiesContext);
  const { getFacilities, facilities } = facilitiesContext;

  // Get facility when component load
  useEffect(() => {
    getFacilities();

    // eslint-disable-next-line
  }, []);

  console.log(facilities);

  const renderedFacilities = facilities.map((facility) => {
    return <FacilityItem key={facility._id} facility={facility} />;
  });

  return <div className='facilities-wrapper'>{renderedFacilities}</div>;
};

export default FacilityList;
