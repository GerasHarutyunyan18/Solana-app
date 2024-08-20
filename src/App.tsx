import React from 'react';
import logo from './logo.svg';
import './App.css';
import ConnectButton from './components/featured/ConnectButton';
import Swap from './components/featured/Swap';

function App() {
  return (
    <div className="App">
      <ConnectButton/>
      <Swap/>
    </div>
  );
}

export default App;
