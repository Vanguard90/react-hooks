// Lifting state
// http://localhost:3000/isolated/exercise/03.js

import React, {useState} from 'react';

function Name() {
  const [name, setName] = useState('');
  return (
    <div>
      <label htmlFor="name">Name: </label>
      <input
        id="name"
        value={name}
        onChange={event => setName(event.target.value)}
      />
    </div>
  );
}

// 🐨 accept `animal` and `onAnimalChange` props to this component
function FavoriteAnimal({animal, setAnimal}) {
  return (
    <div>
      <label htmlFor="animal">Favorite Animal: </label>
      <input
        id="animal"
        value={animal}
        onChange={event => setAnimal(event.target.value)}
      />
    </div>
  );
}

function Display({animal}) {
  return <div>{`Your favorite animal is: ${animal}!`}</div>;
}

function App() {
  // 🐨 add a useState for the animal

  const [animal, setAnimal] = useState('');
  return (
    <form>
      <Name />
      {/* 🐨 pass the animal and onAnimalChange prop here (similar to the Name component above) */}
      <FavoriteAnimal animal={animal} setAnimal={setAnimal} />
      {/* 🐨 pass the animal prop here */}
      <Display animal={animal} />
    </form>
  );
}

export default App;
