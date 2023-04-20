import { useState, useEffect } from 'react';
import SearchBar from './Searchbar';
import ImageGallery from './ImageGallery';
import { AppStyles } from './App.styled';
import { Message } from './ImageGallery/ImageGallery.styled';
import { ImagesApiService } from 'services/api';
import Loader from 'components/Loader';
import Button from 'components/Button';

const STATUS = {
  idle: 'idle',
  pending: 'pending',
  rejected: 'rejected',
  resolved: 'resolved',
};

export function App() {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(STATUS.idle);

  const startConditions = search === '' && status === STATUS.idle;
  const emptyQueryAfterSomeSearch = search === '' && status !== STATUS.idle;

  useEffect(() => {
    if (startConditions) {
      return;
    }
    if (emptyQueryAfterSomeSearch) {
      setStatus(STATUS.resolved);
      setImages(i => [...i]);
    }
    async function fetchData() {
      try {
        const imagesApiService = new ImagesApiService();
        imagesApiService.query = search;
        const imagesObject = await imagesApiService.getImages(page);
        const hits = imagesObject.hits;
        setImages(i => [...i, ...hits]);
        setSearch(search);
        setStatus(STATUS.resolved);
      } catch (error) {
        setError(error);
        setStatus(STATUS.rejected);
      }
    }
    fetchData();
  }, [search, page, startConditions, emptyQueryAfterSomeSearch]);

  const handleSubmit = async query => {
    if (search !== query.input) {
      setImages([]);
      setPage(1);
      setSearch(query.input);
      setStatus(STATUS.pending);
    } else {
      return alert(
        `You have already watched images by search of key word "${search}"`
      );
    }
  };

  const loadMore = () => {
    setStatus(STATUS.pending);
    setPage(page + 1);
  };

  const bigGallery =
    status === STATUS.resolved && images.length > 0 && images.length >= 12;
  const smallGallery =
    status === STATUS.resolved && images.length > 0 && images.length < 12;
  const badRequest = status === STATUS.resolved && images.length === 0;

  return (
    <AppStyles>
      <SearchBar onSubmit={handleSubmit} />

      {status === STATUS.idle && <Message>Search some images above...</Message>}

      {emptyQueryAfterSomeSearch && (
        <>
          <Message>Search some images above...</Message>{' '}
          <Message>Default images without search below...</Message>
        </>
      )}

      {status === STATUS.rejected && (
        <>
          <Message>Something went wrong...</Message>
          <Message>More details about error: {error.message}</Message>
        </>
      )}
      {badRequest && (
        <>
          <Message>No images found by search.</Message>
          <Message>Try typing something different in the search box.</Message>
        </>
      )}
      {status === STATUS.pending && (
        <>
          <ImageGallery images={images} /> <Loader />
        </>
      )}

      {bigGallery && (
        <>
          <ImageGallery images={images} />
          <Button onClick={loadMore} />
        </>
      )}

      {smallGallery && <ImageGallery images={images} />}
    </AppStyles>
  );
}
