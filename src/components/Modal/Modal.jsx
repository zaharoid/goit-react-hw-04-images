import { Component } from 'react';
import { Window, Overlay } from './Modal.styled';
import { createPortal } from 'react-dom';

const portal = document.querySelector('#modal-root');

export default class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.props.onPressEsc);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.props.onPressEsc);
  }

  render() {
    const { bigUrl, alt, onBackdropClick } = this.props;

    return createPortal(
      <Overlay onClick={onBackdropClick}>
        <Window>
          <img src={bigUrl} alt={alt} />
        </Window>
      </Overlay>,
      portal
    );
  }
}
