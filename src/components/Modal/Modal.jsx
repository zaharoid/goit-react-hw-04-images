import { useEffect } from 'react';
import { Window, Overlay } from './Modal.styled';
import { createPortal } from 'react-dom';

const portal = document.querySelector('#modal-root');

export default function Modal({ bigUrl, alt, onBackdropClick, onPressEsc }) {
  useEffect(() => {
    window.addEventListener('keydown', onPressEsc);

    return () => window.removeEventListener('keydown', onPressEsc);
  });

  return createPortal(
    <Overlay onClick={onBackdropClick}>
      <Window>
        <img src={bigUrl} alt={alt} width="1000" />
      </Window>
    </Overlay>,
    portal
  );
}
