import {
  FACILITIES_LOADED,
  FACILITIES_ERROR,
  FACILITY_LOADED,
  FACILITY_ERROR,
  CLEAR_FACILITY,
  CLEAR_FACILITIES,
  SEARCH_SUCCESS,
  SEARCH_FAIL,
  TOP_FACILITIES_LOADED,
  TOP_FACILITIES_ERROR,
  ROOM_LOADED,
  ROOM_LOADED_ERROR,
  CLEAR_ROOM,
  CLEAR_ERRORS,
} from '../types';

const facilityReducer = (state, action) => {
  switch (action.type) {
    case FACILITIES_LOADED:
      return { ...state, facilities: [...action.payload], loading: false };

    case FACILITY_LOADED:
      return { ...state, facility: action.payload, loading: false };

    case ROOM_LOADED:
      return { ...state, room: action.payload, loading: false };

    case TOP_FACILITIES_LOADED:
      return {
        ...state,
        topFacilities: [...action.payload.data],
        loading: false,
      };

    case SEARCH_SUCCESS:
      return {
        ...state,
        searchedFacilities: [...action.payload.data],
        loading: false,
      };

    case CLEAR_FACILITY:
      return { ...state, facility: null };
    case CLEAR_FACILITIES:
      return { ...state, facilities: null };
    case CLEAR_ROOM:
      return { ...state, room: null };
    case CLEAR_ERRORS:
      return { ...state, error: null };

    case FACILITIES_ERROR:
    case FACILITY_ERROR:
    case ROOM_LOADED_ERROR:
    case TOP_FACILITIES_ERROR:
    case SEARCH_FAIL:
      return { ...state, error: action.payload };

    default:
      return state;
  }
};

export default facilityReducer;
