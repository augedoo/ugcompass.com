import './Home.css';
import React, { useEffect, useContext, Fragment } from 'react';
import AccordionSlider from '../../layout/AccordionSlider/AccordionSlider';
import AuthContext from '../../../context/auth/authContext';
import FacilitiesContext from '../../../context/facilities/facilitiesContext';
import Spinner from '../../layout/Spinner/Spinner';
import CategoriesSection from '../../layout/CategoriesSection/CategoriesSection';

const Home = () => {
  const authContext = useContext(AuthContext);
  const facilitiesContext = useContext(FacilitiesContext);

  const { loadUser } = authContext;
  const { topFacilities, getTopFacilities, loading } = facilitiesContext;

  useEffect(() => {
    loadUser();
    getTopFacilities();
    // Todo: Display message if couldnt load top facitilities
    // eslint-disable-next-line
  }, []);

  return (
    <div className='homepage'>
      <section>
        <h1>Popular Places</h1>
        <Fragment>
          {topFacilities !== null && !loading ? (
            <AccordionSlider items={topFacilities} />
          ) : (
            <Spinner size={5} />
          )}
        </Fragment>
      </section>
      <section>
        <h1>Categories</h1>
        <CategoriesSection />
      </section>
      {/* <section>
        <h1>Your Favourites</h1>
        <Fragment></Fragment>
      </section> */}
      <section>
        <h1>Your Reviews</h1>
        <Fragment></Fragment>
      </section>
    </div>
  );
};

export default Home;
