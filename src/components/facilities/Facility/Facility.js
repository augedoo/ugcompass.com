import './Facility.css';
import React, { Fragment, useEffect, useContext } from 'react';
import Spinner from '../../layout/Spinner/Spinner';
import Navigation from './ContentNavigation/ContentNavigation';
import FacilityDetails from './Details/Details';
import Map from './Map/Map';
import Reviews from './Reviews/Reviews';
import RoomsList from './RoomsList/RoomsList';
import ImageList from '../../layout/ImageList/ImageList';

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
    if (facilityId) {
      getFacility(facilityId);
    }
    return () => {
      clearFacility();
    };
    // eslint-disable-next-line
  }, [error]);

  return (
    <Fragment>
      {facility !== null && user !== null && !loading ? (
        <main className='facility-wrapper'>
          <div className='l-content'>
            <div className='facility'>
              <div id='details'>
                <section className='facility__heading'>
                  <h1>
                    {facility.name}
                    <sl-badge type='info'>{`${facility.campus} campus`}</sl-badge>
                  </h1>
                  <p>{`${facility.category} facility`}</p>
                </section>

                <section className='facility__details'>
                  <h3>Description</h3>
                  <FacilityDetails facility={facility} />
                </section>
              </div>

              <section id='photos' className='facility__images'>
                <h3>Photos</h3>
                <ImageList entity={facility} />
              </section>

              {facility.rooms.length > 0 && (
                <section id='rooms' className='facility__rooms'>
                  <h3>Rooms</h3>
                  <RoomsList rooms={facility.rooms} />
                </section>
              )}

              <section id='reviews' className='facility__reviews'>
                <h3>Reviews</h3>
                <Reviews facilityId={facility._id} currentUser={user} />
              </section>
            </div>
          </div>
          <div className='r-content'>
            <div className='r-content-wrapper'>
              <Navigation />
              <Map facility={facility} />
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
