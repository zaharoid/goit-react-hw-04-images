import React, { Component } from 'react';
import Loader from 'components/Loader/Loader';
import Searchbar from 'components/Searchbar';
import { Container } from './App.styled';
import * as API from '../../Services/img_api';
import Button from 'components/Button';
import ImageGallery from 'components/ImageGallery';
import { animateScroll as scroll } from 'react-scroll';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export class App extends Component {
  state = {
    query: '',
    page: 1,
    images: [],
    loading: false,
    totalPages: null,
    error: false,
  };

  setImages = async nextQuery => {
    try {
      await this.setState({ page: 1 });
      this.setState({ query: nextQuery, loading: true, images: [] });

      const data = await API.fetchImgs(nextQuery, this.state.page);

      toast.success(`We found ${data.totalHits} images 4 u :)`);

      this.setState({
        images: data.hits,
        totalPages: Math.ceil(data.totalHits / 12),
      });
    } catch (error) {
      this.setState({ error: true });
    } finally {
      this.setState({ loading: false });
    }
  };

  onSubmit = query => {
    this.setState({ query });
    this.setImages(query);
  };

  onLoadMore = async () => {
    const { query, page } = this.state;

    try {
      let nextPage = page + 1;
      this.setState(({ page }) => ({ page: page + 1 }));
      this.setState({ loading: true });

      const data = await API.fetchImgs(query, nextPage);

      if (this.state.totalPages === this.state.page) {
        toast.warn(
          'Unfortunately we have run out of photos on this request  :('
        );
      }
      this.setState(({ images }) => ({ images: [...images, ...data.hits] }));
      scroll.scrollToBottom();
    } catch (error) {
      this.setState({ error: true });
    } finally {
      this.setState({ loading: false });
    }
  };

  render() {
    const { images, totalPages, page, loading } = this.state;
    return (
      <Container>
        <Searchbar onSubmit={this.onSubmit} isSearching={this.state.loading} />
        <ImageGallery images={images} />
        {loading && <Loader />}

        {images.length > 0 && totalPages > page && !loading && (
          <Button onClick={this.onLoadMore} />
        )}
        <ToastContainer />
      </Container>
    );
  }
}
