import React, { useState } from 'react';
import './index.css';

import KoalaArms from './Design/Koala_Arms.png';
import KoalaBody from './Design/Koala_Body.png';
import SproutLeft from './Design/Sprout1.png';
import SproutRight from './Design/Sprout2.png';
import SettingsIcon from './Design/Settings_Gear.png';

import Settings from './Settings';
import Main from './Main';
import Login from './Login';


function App() {
  const [currentPage, setCurrentPage] = useState('Login');

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <div id="koalaTitle">
        <img src={KoalaArms} id="koalaArms"/>
        <img src={KoalaBody} id="koalaBody"/>
        <button id="settingsButton"><img src={SettingsIcon} alt="Logo" id="buttonPng"/>
        </button>
        <p id="koalaText">Koala Wallet</p>
        <div id="headBorder"></div>
      </div>
      <div className="sideborders-container">
        <div className="border-left">
          <img src={SproutLeft} id="sproutLeft"/>
        </div>
        <div className="content">
          {currentPage === 'Settings' && <Settings />}
          {currentPage === 'Main' && <Main />}
          {currentPage === 'Login' && <Login onPageChange={handlePageChange} />}
        </div>
        <div className="border-right">
          <img src={SproutRight} id="sproutRight"/>
        </div>
      </div>
    </div>
  );
}

export default App;
