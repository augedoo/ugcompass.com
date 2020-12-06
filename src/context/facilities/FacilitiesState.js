import React, { useReducer } from 'react';
import FacilitiesContext from './facilitiesContext';
import facilitiesReducer from './facilitiesReducer';
import ugCompass from '../apis/ugcompass';
import {
  FACILITIES_LOADED,
  FACILITIES_ERROR,
  FACILITY_LOADED,
  CLEAR_FACILITY,
  FACILITY_REVIEWS_LOADED,
  FACILITY_REVIEWS_ERROR,
  TOP_FACILITIES_LOADED,
  TOP_FACILITIES_ERROR,
  FACILITY_ERROR,
  SEARCH_SUCCESS,
  SEARCH_FAIL,
} from '../types';

const FacilitiesState = (props) => {
  const initialState = {
    facilities: null,
    facility: null,
    topFacilities: null,
    searchedFacilities: null,
    reviews: [],
    loading: true,
    error: null,
  };

  const dispatchError = (err, type) => {
    if (err.response.status && err.response.status === 500) {
      dispatch({ type, payload: err.response.statusText });
    } else {
      dispatch({ type, payload: err.response.data.error });
    }
  };

  const [state, dispatch] = useReducer(facilitiesReducer, initialState);

  // Actions
  const getFacilities = async () => {
    try {
      const { data } = await ugCompass.get('/facilities');
      dispatch({ type: FACILITIES_LOADED, payload: data.data });
    } catch (err) {
      dispatchError(FACILITIES_ERROR);
    }
  };

  const searchFacility = async (searchTerm) => {
    try {
      const { data } = await ugCompass.get('/facilities', {
        params: {
          search: searchTerm,
          per_page: 5,
        },
      });
      console.log(data);
      dispatch({ type: SEARCH_SUCCESS, payload: data });
    } catch (err) {
      dispatchError(SEARCH_FAIL);
    }
  };

  const getFacility = async (facilityId) => {
    try {
      const { data } = await ugCompass.get(`/facilities/${facilityId}`, {});
      dispatch({ type: FACILITY_LOADED, payload: data.data });
    } catch (err) {
      dispatchError(err, FACILITY_ERROR);
    }
  };

  const getFacilityReviews = async (facilityId) => {
    try {
      const { data } = await ugCompass.get(`/facilities/${facilityId}`, {});

      dispatch({ type: FACILITY_REVIEWS_LOADED, payload: data.data });
    } catch (err) {
      dispatchError(err, FACILITY_REVIEWS_ERROR);
    }
  };

  const getTopFacilities = async () => {
    try {
      const { data } = await ugCompass.get('/facilities', {
        params: {
          select: 'name,campus,description,category,photos,averageRating',
          per_page: 5,
          order_by: '-averageRating',
        },
      });
      console.log(data);
      dispatch({ type: TOP_FACILITIES_LOADED, payload: data });
    } catch (err) {
      dispatchError(err, TOP_FACILITIES_ERROR);
    }
  };

  const clearFacility = () => dispatch({ type: CLEAR_FACILITY });

  return (
    <FacilitiesContext.Provider
      value={{
        facilities: state.facilities,
        facility: state.facility,
        topFacilities: state.topFacilities,
        searchedFacilities: state.searchedFacilities,
        error: state.error,
        getFacilities,
        getFacility,
        getFacilityReviews,
        clearFacility,
        getTopFacilities,
        searchFacility,
      }}
    >
      {props.children}
    </FacilitiesContext.Provider>
  );
};

export default FacilitiesState;
