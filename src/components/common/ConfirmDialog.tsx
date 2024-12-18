import React from 'react';
import ReactDOM from 'react-dom';
import { DIALOG_MESSAGES } from '../../constants/general';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
}

export const ConfirmDialog: React.FC<Props> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message
}) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="modal-overlay" role="dialog" aria-modal="true">
      <div className="modal-content">
        <h2>{title}</h2>
        <p>{message}</p>
        <div className="modal-actions">
          <button onClick={onClose}>Cancel</button>
          <button 
            className="delete-btn" 
            onClick={onConfirm}
            aria-label={DIALOG_MESSAGES.DELETE_CONTACT.ARIA_LABEL}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};
