// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import React, {useState, useEffect} from 'react';

function useLocalStorage(param, initialName) {
  const lazyLocalStorageName = () =>
    window.localStorage.getItem(param.toString());
  const [customState, setCustomState] = useState(
    lazyLocalStorageName || initialName,
  );

  useEffect(() => {
    if (window.localStorage.getItem(param.toString()) !== customState) {
      window.localStorage.setItem(param.toString(), customState);
    }
  }, [param, customState]);

  return [customState, setCustomState];
}

function Greeting({initialName = ''}) {
  // 🐨 initialize the state to the value from localStorage
  // 💰 window.localStorage.getItem('name') || initialName

  const [name, setName] = useLocalStorage('name', initialName);

  function handleChange(event) {
    setName(event.target.value);
  }
  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input value={name} onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  );
}

function App() {
  return <Greeting />;
}

export default App;
