import React, { useState, useEffect } from 'react';
import { animateScroll as scroll } from 'react-scroll';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from 'components/Loader/Loader';
import Searchbar from 'components/Searchbar';
import { Container } from './App.styled';
import * as API from '../../Services/img_api';
import Button from 'components/Button';
import ImageGallery from 'components/ImageGallery';
import Waiting from 'components/Waiting';
import Error from 'components/Error';

export function App() {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (query === '') {
      return;
    }
    setLoading(true);
    const setQueryImages = async () => {
      try {
        const data = await API.fetchImgs(query, page);

        if (page === 1) {
          data.totalHits === 0
            ? toast.warn(
                "We couldn't find anything, try writing something else. :)"
              )
            : toast.success(`We found ${data.totalHits} images 4 u :)`);

          setTotalPages(Math.ceil(data.totalHits / 12));
        }

        // total page count

        if (Math.ceil(data.totalHits / 12) === page) {
          toast.warn("Unfortunately you've reached the last page ");
        }
        setImages(prevImages => [...prevImages, ...data.hits]);
      } catch (error) {
        setError(true);
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    setQueryImages();
  }, [page, query]);

  const onSubmit = query => {
    setQuery(query);
    setImages([]);
    setPage(1);
  };

  const onLoadMore = () => {
    setPage(prevPage => prevPage + 1);
    scroll.scrollToBottom();
  };

  return (
    <Container>
      <Searchbar onSubmit={onSubmit} isSearching={loading} />
      {images.length ? (
        <ImageGallery images={images} />
      ) : (
        !error && !loading && <Waiting />
      )}
      {loading && <Loader />}
      {error && <Error />}
      {images.length > 0 && totalPages > page && !loading && (
        <Button onClick={onLoadMore} />
      )}
      <ToastContainer />
    </Container>
  );
}
