import React, { useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  async function fetchMoviesHandler() {
    const response = await fetch('https://swapi-node.vercel.app/api/films');

    const data = await response.json();
    const transformedMovies = data.results.map(result => {
      return {
        id: result.fields.episode_id,
        title: result.fields.title,
        openingText: result.fields.opening_crawl,
        releaseDate: result.fields.release_date
      }
    })
    setMovies(transformedMovies);
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        <MoviesList movies={movies} />
      </section>
    </React.Fragment>
  );
}

export default App;
