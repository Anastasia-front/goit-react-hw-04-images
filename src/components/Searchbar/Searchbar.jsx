import React, { Component } from 'react';
import { Header, Form, ButtonSearch, Input, Search } from './Searchbar.styled';
import Glass from './magnifying-glass.svg';
import PropTypes from 'prop-types';

class SearchBar extends Component {
  state = {
    input: '',
  };

  handleChange = e => {
    const input = e.currentTarget.value;
    this.setState({ input });
  };
  handleSubmit = e => {
    e.preventDefault();
    const form = e.currentTarget;
    const input = form.elements.search.value;
    this.props.onSubmit({ input });
  };

  render() {
    return (
      <Header>
        <Form onSubmit={this.handleSubmit}>
          <ButtonSearch type="submit">
            <span>
              <Search src={Glass} alt="Glass" />
            </span>
          </ButtonSearch>

          <Input
            onChange={this.handleChange}
            type="text"
            autocomplete="off"
            autoFocus
            name="search"
            placeholder="Search images and photos"
          />
        </Form>
      </Header>
    );
  }
}

export default SearchBar;

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
