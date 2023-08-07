import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { ReactComponent as SearchIcon } from '../../icons/SearchIcon.svg';
import { Header, Form, Button, Span, Input } from './Searchbar.styled';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default class Searchbar extends Component {
  state = {
    query: '',
  };
  onChangeInput = e => {
    this.setState({ query: e.target.value });
  };
  onFormSubmit = e => {
    e.preventDefault();
    if (this.state.query.trim() === '') {
      return toast.error("Oops, you didn't write anything.");
    }
    this.props.onSubmit(this.state.query);
    this.setState({ query: '' });
  };
  render() {
    return (
      <Header>
        <Form onSubmit={this.onFormSubmit}>
          <Button type="submit" disabled={this.props.isSearching}>
            <Span>Search</Span>
            <SearchIcon />
          </Button>

          <Input
            type="text"
            value={this.state.query}
            onChange={this.onChangeInput}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </Form>
        <ToastContainer />
      </Header>
    );
  }
}

Searchbar.propTypes = {
  isSearching: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
