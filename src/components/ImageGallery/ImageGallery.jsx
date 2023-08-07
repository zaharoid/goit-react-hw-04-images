import PropTypes from 'prop-types';
import React from 'react';
import { Gallery } from './ImageGallery.styled';
import ImageGalleryItem from 'components/ImageGalleryItem';

export default function ImageGallery({ images }) {
  return (
    <Gallery>
      {images.map(({ id, webformatURL, largeImageURL, tags }) => {
        return (
          <ImageGalleryItem
            key={id}
            URL={webformatURL}
            largeURL={largeImageURL}
            descr={tags}
          />
        );
      })}
    </Gallery>
  );
}

ImageGallery.propTypes = {
  images: PropTypes.array.isRequired,
};
