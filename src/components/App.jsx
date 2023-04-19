import React, { Component } from 'react';
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

export class App extends Component {
  state = {
    search: '',
    page: 1,
    images: [],
    error: null,
    status: STATUS.idle,
  };

  async componentDidUpdate(prevProps, prevState) {
    if (
      prevState.search !== this.state.search ||
      prevState.page !== this.state.page
    ) {
      try {
        const imagesApiService = new ImagesApiService();
        imagesApiService.query = this.state.search;
        const images = await imagesApiService.getImages(this.state.page);
        const hits = images.hits;
        const prevImages = this.state.images;

        this.setState({
          search: this.state.search,
          images: [...prevImages, ...hits],
          status: STATUS.resolved,
        });
      } catch (error) {
        this.setState({ error, status: STATUS.rejected });
      }
    }
  }

  handleSubmit = async search => {
    if (this.state.search !== search.input) {
      this.setState({
        images: [],
        search: search.input,
        page: 1,
        status: STATUS.pending,
      });
    } else {
      return alert(
        `You have already watched images by search of key word "${this.state.search}"`
      );
    }
  };

  loadMore = () => {
    this.setState({
      status: STATUS.pending,
    });
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    const { search, error, status, images } = this.state;

    const emptyQueryAfterSomeSearch = search === '' && status !== STATUS.idle;
    const bigGallery =
      status === STATUS.resolved && images.length > 0 && images.length >= 12;
    const smallGallery =
      status === STATUS.resolved && images.length > 0 && images.length < 12;
    const badRequest = status === STATUS.resolved && images.length === 0;

    return (
      <AppStyles>
        <SearchBar onSubmit={this.handleSubmit} />

        {status === STATUS.idle && (
          <Message>Search some images above...</Message>
        )}

        {emptyQueryAfterSomeSearch && (
          <>
            <Message>Search some images above...</Message>{' '}
            <Message>Default images without search below...</Message>
          </>
        )}

        {status === STATUS.pending && (
          <>
            <ImageGallery images={images} /> <Loader />
          </>
        )}

        {status === STATUS.rejected && (
          <Message>
            Something went wrong... More details about error: {error.message}
          </Message>
        )}

        {bigGallery && (
          <>
            <ImageGallery images={images} />
            <Button onClick={this.loadMore} />
          </>
        )}

        {smallGallery && <ImageGallery images={images} />}

        {badRequest && (
          <>
            <Message>No images found by search.</Message>
            <Message>Try typing something different in the search box.</Message>
          </>
        )}
      </AppStyles>
    );
  }
}
