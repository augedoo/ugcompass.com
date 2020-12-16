import './ImageList.css';
import React from 'react';
import ImageCard from './ImageCard';
import { v4 as uuid } from 'uuid';

const ImageList = ({ entity }) => {
  const images = [
    'https://picsum.photos/id/10/800/500',
    'https://picsum.photos/id/11/800/500',
    'https://picsum.photos/id/12/800/500',
    'https://picsum.photos/id/13/800/500',
    'https://picsum.photos/id/14/800/500',
  ];

  const renderedImages = images.map((image) => {
    return (
      <>
        <ImageCard key={uuid()} image={image} />
      </>
    );
  });

  return <div className='image-list'>{renderedImages}</div>;
};

export default ImageList;
