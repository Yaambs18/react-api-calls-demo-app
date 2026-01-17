import React, { useCallback, useEffect, useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';
import MovieForm from './components/MovieForm';

let interval = null;

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMoviesHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('https://swapi-node.vercel.app/api/films');
  
      if(!response.ok) {
        throw new Error("Something went wrong.... Retrying")
      }
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
    } catch (error) {
      setError(error.message);
      clearInterval(interval);
      interval = setInterval(() => {fetchMoviesHandler()}, 5000);
    } finally {
      setIsLoading(false);
    }
  }, []);

  
  useEffect(() => {
    fetchMoviesHandler();
  }, [fetchMoviesHandler]);
  
  function cancelRetryHandler() {
    console.log(clearInterval(interval));
  }

  function addMovieHandler(movie) {
    console.log(movie);
  }

  return (
    <React.Fragment>
      <section>
        <MovieForm onAddMovie={addMovieHandler} />
      </section>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
        <button onClick={cancelRetryHandler}>Cancel Retry</button>
      </section>
      <section>
        { !isLoading && <MoviesList movies={movies} /> }
        { !isLoading && movies.length === 0 && !error && <p>No movies found.</p> }
        { isLoading && <div className="container"><div className="loader"/></div> }
        { !isLoading && error && <p>{error}</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
