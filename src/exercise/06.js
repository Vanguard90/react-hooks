// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import React, {useState, useEffect} from 'react';
import {
  PokemonForm,
  fetchPokemon,
  PokemonInfoFallback,
  PokemonDataView,
} from '../pokemon';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {hasError: false};
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return {hasError: true};
  }
  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.log(error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}

function PokemonInfo({pokemonName}) {
  const [pokemonStatus, setPokemonStatus] = useState({
    status: 'idle',
    pokemon: null,
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    if (pokemonName === '') {
      return;
    }

    setPokemonStatus({status: 'pending', pokemon: null});
    fetchPokemon(pokemonName)
      .then(pokemonData => {
        console.log('pokemonData', pokemonData);
        setPokemonStatus({status: 'resolved', pokemon: pokemonData});
      })
      .catch(err => {
        setError(err);
        setPokemonStatus(prevState => ({
          status: 'rejected',
          pokemon: prevState.pokemon,
        }));
        throw Error('Error with api request');
      });
  }, [pokemonName]);

  if (error && pokemonStatus.status === 'rejected') {
    return (
      <div role="alert">
        There was an error:{' '}
        <pre style={{whiteSpace: 'normal'}}>{error.message}</pre>
      </div>
    );
  }

  if (pokemonStatus.status === 'idle') {
    return <p>Submit a pokemon</p>;
  }

  if (pokemonStatus.status === 'pending') {
    return <PokemonInfoFallback name={pokemonName} />;
  }

  if (pokemonStatus.status === 'resolved') {
    return <PokemonDataView pokemon={pokemonStatus.pokemon} />;
  }
}

function App() {
  const [pokemonName, setPokemonName] = React.useState('');

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName);
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        <ErrorBoundary key={pokemonName}>
          <PokemonInfo pokemonName={pokemonName} />
        </ErrorBoundary>
      </div>
    </div>
  );
}

export default App;
