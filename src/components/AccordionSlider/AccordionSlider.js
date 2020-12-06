import './AccordionSlider.css';
import React, { useState } from 'react';
import AccordionSliderItem from './AccordionSliderItem';
import PropTypes from 'prop-types';

const AccordionSlider = ({ items }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const toggleItem = (index) => {
    setActiveIndex(index);
  };

  // Todo: Delete this array once photos are now fetch from aws or firebase
  const images = [
    'https://picsum.photos/id/10/800/500',
    'https://picsum.photos/id/11/800/500',
    'https://picsum.photos/id/12/800/500',
    'https://picsum.photos/id/13/800/500',
    'https://picsum.photos/id/14/800/500',
  ];

  const renderedItems = items.map((item, index) => {
    const active =
      index === activeIndex ? 'accordion-gallery__item--active ' : '';

    return (
      <AccordionSliderItem
        item={item}
        key={index}
        index={index}
        active={active}
        name={item.name}
        rating={item.averageRating}
        // imageUrl={item.photos[0]} // Todo: When images are ready, use this line of code and delete the next line of code
        imageUrl={images[index]}
        toggleItem={toggleItem}
      />
    );
  });

  return (
    <div className='accordion-gallery'>
      <div className='accordion-gallery__wrapper'>{renderedItems}</div>
    </div>
  );
};

AccordionSlider.propTypes = {
  items: PropTypes.array.isRequired,
};

export default AccordionSlider;
