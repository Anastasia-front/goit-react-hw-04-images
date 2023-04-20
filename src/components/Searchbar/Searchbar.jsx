import { useState } from 'react';
import { Header, Form, ButtonSearch, Input, Search } from './Searchbar.styled';
import Glass from './magnifying-glass.svg';
import PropTypes from 'prop-types';

export default function SearchBar({ onSubmit }) {
  const [input, setInput] = useState('');

  const handleChange = e => {
    const input = e.currentTarget.value;
    setInput(input);
  };
  const handleSubmit = e => {
    e.preventDefault();
    onSubmit({ input });
  };

  return (
    <Header>
      <Form onSubmit={handleSubmit}>
        <ButtonSearch type="submit">
          <span>
            <Search src={Glass} alt="Glass" />
          </span>
        </ButtonSearch>

        <Input
          onChange={handleChange}
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

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
