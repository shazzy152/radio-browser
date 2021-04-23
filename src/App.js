import React from 'react';
import './App.css';
import GenreBrowser from './GenreBrowser.js'


function App() {

  return (
    <div className="App">
      <nav className="nav">
        <h1>International radio</h1>
      </nav>
      <GenreBrowser />
    </div>
  );
}

export default App;
