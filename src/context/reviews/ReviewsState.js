import React, { useReducer, useContext } from 'react';

import AlertContext from '../alert/alertContext';

import ReviewsContext from './reviewsContext';
import reviewsReducer from './reviewsReducer';
import ugCompass from '../apis/ugcompass';
import {
  ADD_REVIEW_FAIL,
  REVIEWS_LOADED,
  REVIEWS_ERROR,
  CLEAR_REVIEWS,
  CLEAR_REVIEWS_ERRORS,
  UPDATE_REVIEW_FAIL,
  DELETE_REVIEW_FAIL,
} from '../types';

const ReviewsState = (props) => {
  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;

  const initialState = {
    reviews: null,
    reviewsLoading: true,
    reviewsError: null,
  };

  const [state, dispatch] = useReducer(reviewsReducer, initialState);

  const setErrorResponse = (err, actionType) => {
    if (err.response) {
      dispatch({ type: actionType, payload: err.response.data.error });
    } else {
      dispatch({ type: actionType, payload: err.message });
    }
  };

  // Actions
  const getReviews = async (facilityId) => {
    let res;
    try {
      if (facilityId) {
        res = await ugCompass.get(`/facilities/${facilityId}/reviews`);
      } else {
        res = await ugCompass.get('/reviews');
      }
      dispatch({ type: REVIEWS_LOADED, payload: res.data.data });
    } catch (err) {
      setErrorResponse(err, REVIEWS_ERROR);
    }
  };

  const addReview = async (reviewData, facilityId) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.ugcompass_token,
      },
    };
    try {
      await ugCompass.post(
        `/facilities/${facilityId}/reviews`,
        reviewData,
        config
      );
      setAlert('Review added successfully', 'success', 'check2-circle');
      getReviews(facilityId);
    } catch (err) {
      setErrorResponse(err, ADD_REVIEW_FAIL);
    }
  };

  // Update Review
  const updateReview = async (reviewFormData, reviewId, facilityId) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.ugcompass_token,
      },
    };
    try {
      await ugCompass.put(`/reviews/${reviewId}`, reviewFormData, config);
      setAlert('Review updated successfully', 'success', 'check2-circle');
      getReviews(facilityId);
    } catch (err) {
      setErrorResponse(err, UPDATE_REVIEW_FAIL);
    }
  };

  // Delete Review
  const deleteReview = async (reviewId, facilityId) => {
    const config = {
      headers: {
        Authorization: localStorage.ugcompass_token,
      },
    };
    try {
      await ugCompass.delete(`/reviews/${reviewId}`, config);
      setAlert('Review delete successfully', 'success', 'check2-circle');
      getReviews(facilityId);
    } catch (err) {
      setErrorResponse(err, DELETE_REVIEW_FAIL);
    }
  };

  const clearReviews = () => dispatch({ type: CLEAR_REVIEWS });
  const clearReviewsErrors = () => dispatch({ type: CLEAR_REVIEWS_ERRORS });

  return (
    <ReviewsContext.Provider
      value={{
        reviews: state.reviews,
        reviewsLoading: state.reviewsLoading,
        reviewsError: state.reviewsError,
        getReviews,
        addReview,
        updateReview,
        deleteReview,
        clearReviews,
        clearReviewsErrors,
      }}
    >
      {props.children}
    </ReviewsContext.Provider>
  );
};

export default ReviewsState;
