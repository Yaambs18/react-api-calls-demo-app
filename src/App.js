import React, { useCallback, useEffect, useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';
import MovieForm from './components/MovieForm';

let interval = null;
const FIREBASE_URL = process.env.REACT_APP_FIREBASE_DATABASE_URL;

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMoviesHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`${FIREBASE_URL}movies.json`);
  
      if(!response.ok) {
        throw new Error("Something went wrong.... Retrying")
      }
      const data = await response.json();

      const loadedMovies = [];

      for (const key in data) {
        loadedMovies.push({
          id: key,
          title: data[key].title,
          openingText: data[key].openingText,
          releaseDate: data[key].releaseDate
        })
      }
      
      setMovies(loadedMovies);
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

  async function addMovieHandler(movie) {
    // console.log(movie);
    try {
      const response = await fetch(`${FIREBASE_URL}movies.json`, {
        method: 'POST',
        body: JSON.stringify(movie),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      await response.json();
      fetchMoviesHandler();
    } catch(error) {
      console.log(error);
    }
  }

  async function deleteMovieHandler(id) {
    try {
      const response = await fetch(`${FIREBASE_URL}movies/${id}.json`, {
        method: 'DELETE'
      })
  
      await response.json();
      fetchMoviesHandler()
    } catch(error) {
      console.log(error)
    }
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
        { !isLoading && <MoviesList movies={movies} deleteMovieHandler={deleteMovieHandler}/> }
        { !isLoading && movies.length === 0 && !error && <p>No movies found.</p> }
        { isLoading && <div className="container"><div className="loader"/></div> }
        { !isLoading && error && <p>{error}</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
