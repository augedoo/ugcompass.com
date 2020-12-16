import './Reviews.css';
import moment from 'moment';
import { Link } from 'react-scroll';
import React, { Fragment, useState, useEffect, useContext } from 'react';
import ReviewsContext from '../../../../context/reviews/reviewsContext';
import AlertContext from '../../../../context/alert/alertContext';

const Reviews = ({ currentUser, facilityId }) => {
  const reviewsContext = useContext(ReviewsContext);
  const alertContext = useContext(AlertContext);

  const [currentReviews, setCurrentReviews] = useState(null);
  const [currentReview, setCurrentReview] = useState(null);
  const [reviewFormData, setReviewFormData] = useState({
    rating: '',
    title: '',
    text: '',
  });

  const {
    reviews,
    reviewsError,
    addReview,
    getReviews,
    updateReview,
    deleteReview,
    clearReviews,
    reviewsLoading,
    clearReviewsErrors,
  } = reviewsContext;
  const { setAlert } = alertContext;

  useEffect(() => {
    if (!currentReviews) {
      getReviews(facilityId);
    }

    if (reviews !== null) {
      setCurrentReviews(reviews);
    }

    if (reviewsError) {
      setAlert(reviewsError, 'warning', 'exclamation-triangle');
    }

    return () => {
      clearReviews();
      clearReviewsErrors();
    };

    // eslint-disable-next-line
  }, [reviews, reviewsError]);

  const onChange = (e) =>
    setReviewFormData({ ...reviewFormData, [e.target.name]: e.target.value });

  // Add / Update review
  const onReviewSubmit = (e) => {
    e.preventDefault();
    reviewFormData.rating =
      reviewFormData.rating === '0' || reviewFormData.rating === ''
        ? 10
        : Number(reviewFormData.rating);

    const { text, rating, title } = reviewFormData;
    if (text === '' || rating === '' || title === '') {
      setAlert(
        'You need to fill all fields for review',
        'warning',
        'exclamation-triangle'
      );
      return;
    }
    if (currentReview) {
      updateReview(reviewFormData, currentReview._id, facilityId);
      setCurrentReview(null);
    } else {
      addReview(reviewFormData, facilityId);
    }
    setReviewFormData({
      rating: '',
      title: '',
      text: '',
    });
  };

  // Delete Review
  const onDeleteReviewSubmit = (reviewId) => {
    deleteReview(reviewId, facilityId);
  };

  // Edit Review
  const onEditReview = (review) => {
    setCurrentReview(review);
    setReviewFormData({
      rating: review.rating,
      title: review.title,
      text: review.text,
    });
  };

  console.log(currentUser);

  return (
    <Fragment>
      <form
        onSubmit={onReviewSubmit}
        className='review-form'
        id='review-form'
        noValidate
      >
        <h3>Write a review</h3>
        <div className='form-wrapper'>
          <div className='form-row'>
            <div className='form-control'>
              <label htmlFor='title'>Title</label>
              <input
                type='text'
                name='title'
                id='title'
                placeholder='Enter review title'
                onChange={onChange}
                value={reviewFormData.title}
                required
              />
              <div className='help-text'>Keep title short</div>
            </div>
            <div className='form-control'>
              <label htmlFor='rating'>Rating</label>
              <select
                name='rating'
                id='rating'
                defaultValue='10'
                onChange={onChange}
              >
                <option value='10'>5 - Excellent</option>
                <option value='8'>4 - Very Good</option>
                <option value='6'>3 - Good</option>
                <option value='4'>2 - Fair</option>
                <option value='2'>1 - Poor</option>
              </select>
            </div>
          </div>
          <div className='form-control'>
            <label htmlFor='body'>Comment</label>
            <textarea
              name='text'
              id='body'
              placeholder='Enter review body'
              onChange={onChange}
              value={reviewFormData.text}
              required
            ></textarea>
          </div>
          <div className='form-control'>
            {currentReview ? (
              <input
                className='submit-edit'
                type='submit'
                value='Update Review'
              />
            ) : (
              <input type='submit' value='Submit Review' />
            )}
          </div>
        </div>
      </form>

      <div className='reviews-wrapper'>
        <h3>Reviews from others</h3>
        {currentReviews && !reviewsLoading ? (
          <Fragment>
            {currentReviews.length > 0 ? (
              // Render review when everything is okay
              currentReviews.map((review) => {
                console.log(review);
                const { _id, rating, title, text, user, createdAt } = review;
                return (
                  <div key={_id} className='review'>
                    <div className='rating-controls'>
                      <sl-rating max='5' value={rating / 2}></sl-rating>
                      {user &&
                        currentUser._id.toString() === user._id.toString() && (
                          <div>
                            <a
                              href='#!'
                              onClick={() => onDeleteReviewSubmit(_id)}
                            >
                              <sl-tooltip
                                content='Delete Comment'
                                placement='bottom'
                              >
                                <sl-icon name='trash-fill'></sl-icon>
                              </sl-tooltip>
                            </a>

                            <Link
                              activeClass='active'
                              to='reviews'
                              spy={true}
                              smooth={false}
                              offset={-80}
                              duration={500}
                              onClick={() => onEditReview(review)}
                            >
                              <sl-tooltip
                                content='Edit Comment'
                                placement='bottom'
                              >
                                <sl-icon name='pencil-square'></sl-icon>
                              </sl-tooltip>
                            </Link>
                          </div>
                        )}
                    </div>
                    <h5>{title}</h5>
                    <p>{text}</p>
                    <span className='time-ago'>
                      {moment(createdAt).fromNow()}
                      {user &&
                        (currentUser._id.toString() === user._id.toString()
                          ? ' by You'
                          : ' by ' + user.name)}
                    </span>
                  </div>
                );
              })
            ) : (
              // Display no reviews
              <div className='no-reviews'>No Reviews</div>
            )}
          </Fragment>
        ) : (
          <div className='spinner'>
            <sl-spinner></sl-spinner>
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default Reviews;
