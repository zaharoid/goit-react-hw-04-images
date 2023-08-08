import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Item, Image } from './ImageGalleryItem.styled';
import Modal from 'components/Modal';

export default function ImageGalleryItem({ URL, descr, largeURL }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const onImgClick = () => {
    setModalIsOpen(true);
  };

  const onBackdropClick = e => {
    if (e.target === e.currentTarget) {
      setModalIsOpen(false);
    }
  };

  const onPressEsc = e => {
    if (e.code === 'Escape') {
      setModalIsOpen(false);
    }
  };

  return (
    <>
      <Item>
        <Image onClick={onImgClick} src={URL} alt={descr} />
      </Item>

      {modalIsOpen && (
        <Modal
          bigUrl={largeURL}
          alt={descr}
          onBackdropClick={onBackdropClick}
          onPressEsc={onPressEsc}
        />
      )}
    </>
  );
}

ImageGalleryItem.propTypes = {
  URL: PropTypes.string.isRequired,
  largeURL: PropTypes.string.isRequired,
  descr: PropTypes.string.isRequired,
};
