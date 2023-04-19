import PropTypes from 'prop-types';
import Modal from 'components/Modal';
import { Component } from 'react';
import { GalleryItem, Image, LargePhoto } from './ImageGalleryItem.styled';

class ImageGalleryItem extends Component {
  state = {
    isModalOpen: false,
  };

  openModal = () => {
    this.setState({ isModalOpen: true });
  };
  closeModal = () => {
    this.setState({ isModalOpen: false });
  };
  render() {
    const { fields } = this.props;
    const { isModalOpen } = this.state;

    return (
      <GalleryItem>
        <Image
          onClick={this.openModal}
          src={fields.webformatURL}
          alt={fields.tags}
        />
        {isModalOpen && (
          <Modal onClose={this.closeModal}>
            <LargePhoto src={fields.largeImageURL} alt={fields.tags} />
          </Modal>
        )}
      </GalleryItem>
    );
  }
}

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  fields: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }),
};
