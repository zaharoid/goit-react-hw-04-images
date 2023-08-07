import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Item, Image } from './ImageGalleryItem.styled';
import Modal from 'components/Modal';

export default class ImageGalleryItem extends Component {
  state = {
    modalIsOpen: false,
  };

  onImgClick = () => {
    this.setState({ modalIsOpen: true });
  };

  onBackdropClick = e => {
    if (e.target === e.currentTarget) {
      this.setState({ modalIsOpen: false });
    }
  };

  onPressEsc = e => {
    if (e.code === 'Escape') {
      this.setState({ modalIsOpen: false });
    }
  };

  render() {
    const { URL, descr, largeURL } = this.props;
    const { modalIsOpen } = this.state;
    return (
      <>
        <Item>
          <Image onClick={this.onImgClick} src={URL} alt={descr} />
        </Item>

        {modalIsOpen && (
          <Modal
            bigUrl={largeURL}
            alt={descr}
            onBackdropClick={this.onBackdropClick}
            onPressEsc={this.onPressEsc}
          />
        )}
      </>
    );
  }
}

ImageGalleryItem.propTypes = {
  URL: PropTypes.string.isRequired,
  largeURL: PropTypes.string.isRequired,
  descr: PropTypes.string.isRequired,
};
