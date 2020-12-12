import './ImageList.css';
import React from 'react';
import { v4 as uuid } from 'uuid';
import ImageCard from './ImageCard';

const ImageList = ({ entity }) => {
  const images = [
    'https://picsum.photos/id/10/1000/600',
    'https://picsum.photos/id/11/400/200',
    'https://picsum.photos/id/12/500/500',
    'https://picsum.photos/id/13/450/300',
    'https://picsum.photos/id/14/830/300',
  ];

  const { photos, name } = entity;

  const renderedImages = images.map((image) => {
    // return <ImageCard key={uuid()} image={photos} desc={name} />;
    return <ImageCard key={uuid()} image={image} />;
  });

  return <div className='image-list'>{renderedImages}</div>;
};

export default ImageList;
