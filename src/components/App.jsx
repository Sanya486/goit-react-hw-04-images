import React, { useEffect, useRef, useState } from 'react';

import { Notify } from 'notiflix';
import Loader from './Loader/Loader';
import { animateScroll as scroll } from 'react-scroll';

import css from './App.module.css';

import { fetchImages } from 'api/api';

import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Modal from './Modal/Modal';
import Placeholder from './Placeholder/Placeholder';

const html = document.querySelector('html');

const App = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [searchResults, setSearchResults] = useState([]);
  const [isLoadMoreEnable, setIsLoadMoreEnable] = useState(false);
  const [isModalShow, setIsModalShow] = useState(false);
  const [isLoaderShow, setIsLoaderShow] = useState(false);
  const [largeImage, setLargeImage] = useState({});
  const isFirstRender = useRef(true);

  const scrollToBottom = () => {
    scroll.scrollMore(window.outerHeight - 290, {
      smooth: true,
      delay: 100,
    });
  };

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    setIsLoaderShow(true);

    async function fetchAPI() {
      const response = await fetchImages(query, page);
      if (response.hits.length === 0 && page === 1) {
        Notify.warning(
          'Oops. Sorry, but there isn`t anything for this request! Try to find something different!'
        );
        setIsLoadMoreEnable(false);
      }
      else if (response.hits.length === 0 && page !== 1) {
        Notify.warning(
          'Sorry, but that`s all for your request =( Let`s search something else'
        );
        setIsLoadMoreEnable(false);
      }
      else {
        setSearchResults(prev => [...prev, ...response.hits]);
        setIsLoadMoreEnable(true);
      }
    }
      fetchAPI();
      setIsLoaderShow(false);
  }, [page, query]);

  const OnSubmit = e => {
    const searchRequest = e.target.elements.search.value;
    if (query === searchRequest) {
      return Notify.warning(`You are already watching ${query}`);
    }
    setQuery(searchRequest.toLowerCase());
    setIsLoadMoreEnable(false);
    setSearchResults([]);
    setPage(1);
  };

  const onLoadMore = () => {
    setPage(prev => prev + 1);
  };

  const onImageClick = (src, alt) => {
    setIsModalShow(true);
    setLargeImage({ src, alt });
    html.style.overflow = 'hidden';
  };

  const onCloseModal = () => {
    setIsModalShow(false);
    html.style.overflow = 'auto';
  };

  return (
    <div className={css.App}>
      <Searchbar onSubmit={OnSubmit} />
      <Placeholder />
      {searchResults && (
        <ImageGallery
          searchResults={searchResults}
          onImageClick={onImageClick}
        />
      )}
      {isLoaderShow && <Loader />}
      {searchResults && isLoadMoreEnable && (
        <Button onClick={onLoadMore} scrollToBottom={scrollToBottom} />
      )}
      {isModalShow && (
        <Modal
          src={largeImage.src}
          alt={largeImage.alt}
          onCloseModal={onCloseModal}
        />
      )}
    </div>
  );
};

App.propTypes = {};

export default App;
