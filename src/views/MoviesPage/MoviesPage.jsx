import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Form, Input, Button } from './MoviesPage.styled';
import { FaSearch } from 'react-icons/fa';
import { fetchMovies } from '../../service/ApiService';
import { useNavigate, useLocation } from 'react-router-dom';
import MovieList from '../../components/MovieList/MovieList';

export default function MoviesPage() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const history = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const searchQuery = new URLSearchParams(location.search).get('query');
    if (location.search !== '') {
      searchMovies(searchQuery);
    }
  }, [location.search]);

  const searchMovies = query => {
    fetchMovies(query)
      .then(data => {
        if (data.results.length === 0) {
          toast.error(`Ooops, no match found.`);
          return;
        }

        setMovies(data.results);
      })

      .catch(error => console.log(error.message));
  };

  const handleInputChange = e => {
    setQuery(e.target.value.toLowerCase());
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (query.trim() === '') {
      return toast.error('Please enter value');
    }
    searchMovies(query);
    history.push({
      search: `query=${query}`,
      state: { from: location },
    });
    setQuery('');
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          autoComplete="off"
          placeholder="Search"
          value={query}
          onChange={handleInputChange}
        />
        <Button type="submit">
          <FaSearch />
        </Button>
      </Form>
      <MovieList movies={movies} />
    </>
  );
}