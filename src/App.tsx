import React from 'react';
import './App.css';
import up from './icons/Academy-Weather forecast-Bg-up.svg';
import bottom from './icons/Academy-Weather forecast-Bg-buttom.svg';

function App() {
  return (
    <div className="App">
      <header className="App-header">
          <img className="up" src={up}/>
          <img className="bottom" src={bottom}/>
      </header>
    </div>
  );
}

export default App;
