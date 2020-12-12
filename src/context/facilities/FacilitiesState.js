import React, { useReducer } from 'react';
import FacilitiesContext from './facilitiesContext';
import facilitiesReducer from './facilitiesReducer';
import ugCompass from '../apis/ugcompass';
import {
  FACILITIES_LOADED,
  FACILITIES_ERROR,
  FACILITY_LOADED,
  CLEAR_FACILITY,
  CLEAR_FACILITIES,
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

  const [state, dispatch] = useReducer(facilitiesReducer, initialState);

  const setErrorResponse = (err, actionType) => {
    if (err.response) {
      dispatch({ type: actionType, payload: err.response.data.error });
    } else {
      dispatch({ type: actionType, payload: err.message });
    }
  };

  // Actions
  const getFacilities = async (category) => {
    let res;
    try {
      if (category) {
        res = await ugCompass.get(`/facilities?category[in]=${category}`);
      } else {
        res = await ugCompass.get('/facilities');
      }
      dispatch({ type: FACILITIES_LOADED, payload: res.data.data });
    } catch (err) {
      setErrorResponse(err, FACILITIES_ERROR);
    }
  };

  const getFacility = async (facilityId) => {
    try {
      const { data } = await ugCompass.get(`/facilities/${facilityId}`);
      dispatch({ type: FACILITY_LOADED, payload: data.data });
    } catch (err) {
      setErrorResponse(err, FACILITY_ERROR);
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
      dispatch({ type: SEARCH_SUCCESS, payload: data });
    } catch (err) {
      setErrorResponse(err, SEARCH_FAIL);
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
      setErrorResponse(err, TOP_FACILITIES_ERROR);
    }
  };

  const clearFacility = () => dispatch({ type: CLEAR_FACILITY });

  const clearFacilities = () => dispatch({ type: CLEAR_FACILITIES });

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
        clearFacility,
        clearFacilities,
        getTopFacilities,
        searchFacility,
      }}
    >
      {props.children}
    </FacilitiesContext.Provider>
  );
};

export default FacilitiesState;
