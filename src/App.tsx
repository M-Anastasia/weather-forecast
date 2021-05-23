import React from 'react';
import './App.css';
import up from './icons/Academy-Weather forecast-Bg-up.svg';
import bottom from './icons/Academy-Weather forecast-Bg-buttom.svg';

function App() {
  return (
      <div className="app">
          <header className="header">
              <p className="header-font1">Weather</p>
              <p className="header-font2">forecast</p>
          </header>
          <img className="up" src={up}/>
          <img className="bottom" src={bottom}/>
      </div>
  );
}

export default App;
