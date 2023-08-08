import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { ReactComponent as SearchIcon } from '../../icons/SearchIcon.svg';
import { Header, Form, Button, Span, Input } from './Searchbar.styled';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Searchbar({ onSubmit, isSearching }) {
  const [query, setQuery] = useState('');
  const onChangeInput = e => {
    setQuery(e.target.value);
  };
  const onFormSubmit = e => {
    e.preventDefault();
    if (query.trim() === '') {
      return toast.error("Oops, you didn't write anything.");
    }
    onSubmit(query);
    setQuery('');
  };

  return (
    <Header>
      <Form onSubmit={onFormSubmit}>
        <Button type="submit" disabled={isSearching}>
          <Span>Search</Span>
          <SearchIcon />
        </Button>

        <Input
          type="text"
          value={query}
          onChange={onChangeInput}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </Form>
      <ToastContainer />
    </Header>
  );
}

Searchbar.propTypes = {
  isSearching: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
