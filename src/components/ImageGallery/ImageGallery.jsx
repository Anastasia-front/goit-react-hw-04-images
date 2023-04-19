import ImageGalleryItem from 'components/ImageGalleryItem';
// import Loader from 'components/Loader';
import PropTypes from 'prop-types';
// import Button from 'components/Button';
import { Gallery } from './ImageGallery.styled';
// import { ImagesApiService } from 'services/api';

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
