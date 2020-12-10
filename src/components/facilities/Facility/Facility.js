import './Facility.css';
import React, { Fragment, useEffect, useContext } from 'react';
import Spinner from '../../layout/Spinner/Spinner';
import Navigation from './ContentNavigation/ContentNavigation';
import FacilityDetails from './Details/Details';
import Map from './Map/Map';
import Reviews from './Reviews/Reviews';
import RoomsList from './RoomsList/RoomsList';
import Carousel from '../../layout/Carousel/Carousel';

import FacilityContext from '../../../context/facilities/facilitiesContext';
import AuthContext from '../../../context/auth/authContext';

const Facility = (props) => {
  const faciltyContext = useContext(FacilityContext);
  const authContext = useContext(AuthContext);
  const {
    getFacility,
    facility,
    error,
    loading,
    clearFacility,
  } = faciltyContext;
  const { user, loadUser } = authContext;

  useEffect(() => {
    loadUser();

    const facilityId = props.match.params.facilityId;
    if (facilityId) getFacility(facilityId);

    return () => {
      clearFacility();
    };
    // eslint-disable-next-line
  }, [error]);

  return (
    <Fragment>
      {facility !== null && !loading ? (
        <main className='facility-wrapper'>
          <div className='l-content'>
            <div className='facility'>
              <section className='facility__heading'>
                <h1>
                  {facility.name}
                  <sl-badge type='info'>{`${facility.campus} campus`}</sl-badge>
                </h1>
                <p>{`${facility.category} facility`}</p>
              </section>

              <section id='details' className='facility__details'>
                <h3>Description</h3>
                <FacilityDetails facility={facility} />
              </section>

              <section id='photos' className='facility__carousel'>
                {/* <Carousel /> */}
              </section>

              {facility.rooms.length > 0 && (
                <section id='rooms' className='facility__rooms'>
                  <h3>Rooms</h3>
                  <RoomsList rooms={facility.rooms} />
                </section>
              )}

              <section id='reviews' className='facility__reviews'>
                <h3>Reviews</h3>
                {/* <form onSubmit={onReviewSubmit}></form> */}
                <Reviews />
              </section>
            </div>
          </div>
          <div className='r-content'>
            <div className='r-content-wrapper'>
              <Navigation />
              <Map />
            </div>
          </div>
        </main>
      ) : (
        <Spinner size={4} />
      )}
    </Fragment>
  );
};

export default Facility;
