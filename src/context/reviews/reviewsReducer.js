import {
  ADD_REVIEW_FAIL,
  UPDATE_REVIEW_FAIL,
  REVIEWS_LOADED,
  REVIEWS_ERROR,
  CLEAR_REVIEWS,
  CLEAR_REVIEWS_ERRORS,
  DELETE_REVIEW_FAIL,
} from '../types';

const reviewsReducer = (state, action) => {
  switch (action.type) {
    case REVIEWS_LOADED:
      return {
        ...state,
        reviews: [...action.payload],
        reviewsLoading: false,
      };
    case ADD_REVIEW_FAIL:
    case UPDATE_REVIEW_FAIL:
    case DELETE_REVIEW_FAIL:
      return { ...state, reviewsError: action.payload };

    case REVIEWS_ERROR:
      return { ...state, reviews: null, reviewsError: action.payload };

    case CLEAR_REVIEWS:
      return { ...state, reviews: null };

    case CLEAR_REVIEWS_ERRORS:
      return { ...state, reviewsError: null };

    default:
      return state;
  }
};

export default reviewsReducer;
