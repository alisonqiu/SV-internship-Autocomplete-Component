import React from 'react';
import './App.css';
import Dropdown from './Components/Dropdown';
import Carddemo from './Components/Carddemo'
import Tabledemo from './Components/Tabledemo'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

function App() {
  return (
    <p>
      <h1>Dropdown</h1>
      <Dropdown/>
      <h1>Carddemo</h1>
      <Carddemo/>
      <h1>Tabledemo</h1>
      <Tabledemo/>
    </p>
  );
}

export default App;
