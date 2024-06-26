import React from 'react';
import ReactModal from 'react-modal';
import Modal from 'react-modal';

interface ModalProps {
  isOpen: boolean;
  onOpen: () => void;
  onHidden: () => void;
  onClose: () => void;
  ref?: React.RefObject<ReactModal>;
  children: React.ReactNode; 
}

Modal.setAppElement('#root');

const CustomModal: React.FC<ModalProps> = ({ isOpen, onOpen,onHidden,onClose, children, ref }) => {
  return (
    <Modal
      ref={ref}
      isOpen={isOpen}
      onAfterOpen={onOpen}
      onAfterClose={onHidden}
      shouldCloseOnOverlayClick ={false}
      onRequestClose={onClose}
      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-md flex w-full max-h-full p-4"
      overlayClassName="fixed z-[1000] top-0 left-0 w-full h-full bg-gray-900 bg-opacity-30 flex items-center justify-center backdrop-blur-sm"
    >
      {children}
    </Modal>
  );
};

export default CustomModal;