import './Facility.css';
import React, { Fragment, useEffect, useContext, useCallback } from 'react';
import Spinner from '../../layout/Spinner/Spinner';
import Navigation from './ContentNavigation/ContentNavigation';
import FacilityDetails from './Details/Details';
import Map from './Map/Map';
import Reviews from './Reviews/Reviews';
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

  const carouselContainerRef = useCallback((node) => {
    if (node !== null) {
      let containerWidth;
      window.addEventListener('load', () => {
        containerWidth = node.clientWidth;
      });
      window.addEventListener('resize', () => {
        containerWidth = node.clientWidth;
      });
    }
  }, []);

  useEffect(() => {
    const facilityId = props.match.params.facilityId;
    authContext.loadUser();
    getFacility(facilityId);

    return () => {
      clearFacility();
    };
    // eslint-disable-next-line
  }, [props.match.params.facilityId, error]);

  return (
    <Fragment>
      {facility !== null && !loading ? (
        <main className='facility-wrapper'>
          <div className='l-content'>
            <div className='facility'>
              <section id='photos' className='facility__heading'>
                <h1>
                  {facility.name}
                  <sl-badge type='info'>{`${facility.campus} campus`}</sl-badge>
                </h1>
                <p>{`${facility.category} facility`}</p>
              </section>
              <section
                className='facility__carousel'
                ref={carouselContainerRef}
              >
                {/* <Carousel /> */}
              </section>
              <section id='details' className='facility__details'>
                <h3>Description</h3>
                <FacilityDetails facility={facility} />
              </section>
              <section id='rooms' className='facility__rooms'>
                <h3>Rooms in {facility.name}</h3>
              </section>
              <section id='reviews' className='facility__reviews'>
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
