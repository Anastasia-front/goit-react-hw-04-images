import PropTypes from 'prop-types';
import Modal from 'components/Modal';
import { useState } from 'react';
import { GalleryItem, Image, LargePhoto } from './ImageGalleryItem.styled';

export default function ImageGalleryItem({ fields }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <GalleryItem>
      <Image onClick={openModal} src={fields.webformatURL} alt={fields.tags} />
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <LargePhoto src={fields.largeImageURL} alt={fields.tags} />
        </Modal>
      )}
    </GalleryItem>
  );
}

ImageGalleryItem.propTypes = {
  fields: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }),
};
