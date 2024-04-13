import React, { useState } from 'react';
import './index.css';
import Settings from './Settings';
import Main from './Main';
import Login from './Login';


function App() {
  const [currentPage, setCurrentPage] = useState('Login');

  const setData = () => {
    console.log("RAHHHHHHHHHHHHHHHHHH")
  }

  return (
    <div>
      <div id="koalaTitle">
        <p id="koalaText">Koala Wallet</p>
        <div id="headBorder"></div>
      </div>
      <div className="sideborders-container">
        <div className="border-left"></div>
        <div className="content">
          {currentPage === 'Settings' && <Settings />}
          {currentPage === 'Main' && <Main />}
          {currentPage === 'Login' && <Login />}
        </div>
        <div className="border-right"></div>
      </div>
    </div>
  );
}

export default App;
