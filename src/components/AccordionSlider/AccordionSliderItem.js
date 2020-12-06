import React from 'react';
import PropTypes from 'prop-types';

const AccordionSliderItem = (props) => {
  const { item, name, rating, imageUrl, index, toggleItem, active } = props;

  return (
    <div
      className={`accordion-gallery__item ${active}`}
      onClick={() => toggleItem(index)}
    >
      <a className='goto' href={`/facilities/${item.id}`}></a>
      <div className='accordion-gallery__item__img'>
        <img src={imageUrl} alt='Accordion Item' />
      </div>
      <div className='accordion-gallery__item__info'>
        <div className='wrapper'>
          {name && <p>{name}</p>}
          {rating && (
            <sl-rating readonly='true' max='5' value={rating / 2}></sl-rating>
          )}
        </div>
      </div>
    </div>
  );
};

AccordionSliderItem.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  name: PropTypes.string,
  rating: PropTypes.number,
};

export default AccordionSliderItem;
