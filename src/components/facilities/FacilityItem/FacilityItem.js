import './FacilityItem.css';
import React from 'react';

const FacilityItem = ({ facility }) => {
  const {
    name,
    campus,
    category,
    description,
    location,
    photos,
    hours,
    averageRating,
    numberOfRooms,
    numberOfReviews,
  } = facility;

  return (
    <div className='facility-item'>
      <div className='facility-item__image'>
        <img src={`https://unsplash.it/400`} alt='' />
      </div>
      <div className='facility-item__info'>
        <div className='wrapper'>
          <div>
            <sl-badge type='info' pill className='campus-badge'>
              {campus} campus
            </sl-badge>
            {/* Rooms */}
            {numberOfRooms > 0 ? (
              <span className='rooms'>{`${numberOfRooms} room${
                numberOfRooms > 1 ? 's' : ''
              }`}</span>
            ) : null}
          </div>
          <h3 className='name'>{name}</h3>
          <p className='category'>{category}</p>
          <div>
            <sl-rating
              readonly='true'
              max='5'
              value={averageRating ? averageRating / 2 : 0}
            ></sl-rating>
            {/* Reviews */}
            <span className='reviews'>{`${
              numberOfReviews === 0 ? 'no' : numberOfReviews
            } review${numberOfReviews > 1 ? 's' : ''}`}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacilityItem;
