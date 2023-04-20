import ImageGalleryItem from 'components/ImageGalleryItem';
import PropTypes from 'prop-types';
import { Gallery } from './ImageGallery.styled';

const ImageGallery = ({ images }) => {
  return (
    <>
      <Gallery>
        {images.length ? (
          images.map(hit => <ImageGalleryItem key={hit.id} fields={hit} />)
        ) : (
          <p></p>
        )}
      </Gallery>
    </>
  );
};

export default ImageGallery;

Gallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    })
  ),
};
