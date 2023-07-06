import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import css from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ src, alt, onCloseModal }) => {
  useEffect(() => {
    closeOnEscape();
    return () => {
      window.removeEventListener('keydown', onKeydown);
    }
  });

  function onKeydown(e) {
    if (e.code === 'Escape') {
      onCloseModal();
    }
  }

  function closeOnEscape() {
    window.addEventListener('keydown', onKeydown);
  }

  function closeOnBackdrop(e) {
    if (e.target === e.currentTarget) {
      onCloseModal();
    }
  }

  return createPortal(
    <div className={css.Overlay} onClick={closeOnBackdrop}>
      <div className={css.Modal}>
        <img src={src} alt={alt} />
      </div>
    </div>,
    modalRoot
  );
};

Modal.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  onCloseModal: PropTypes.func.isRequired,
};

export default Modal;

