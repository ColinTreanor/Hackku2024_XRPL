import React, { useState } from 'react';
import './index.css';

// Import images
import KoalaArms from './Design/Koala_Arms.png';
import KoalaBody from './Design/Koala_Body.png';
import SproutLeft from './Design/Sprout1.png';
import SproutRight from './Design/Sprout2.png';
import SettingsIcon from './Design/Settings_Gear.png';

// Import components to set App.js as Parent component
import Settings from './Settings';
import Main from './Main';
import Login from './Login';

// App component
function App() {
  const [currentPage, setCurrentPage] = useState('Login');
  const [userSeed, setUserSeed] = useState('');
  const [public_key, setPublicKey] = useState('');
  

  const onSetUserSeed = (seed) => {
    setUserSeed(seed);
};

  const onSetPublicKey = (key) => {
    setPublicKey(key);
};

  const handlePageChange = (page) => {
    setCurrentPage(page);

  };

  const toggleSettings = () => {
    if (currentPage === 'Main') {
      setCurrentPage('Settings');
    } else if (currentPage === 'Settings') {
      setCurrentPage('Main'); // Hide settings icon on other pages (e.g., Login)
    }
  };
  
// Return the App component
  return (
    <div>
      <div id="koalaTitle">
        <img src={KoalaArms} alt="Koala Arms" id="koalaArms"/>
        <img src={KoalaBody} alt="Koala Body" id="koalaBody"/>
        <p id="koalaText">Koala Pouch</p>
        {currentPage !== 'Login' && (
          <>
            <button id="settingsButton" onClick={toggleSettings}>
              <img src={SettingsIcon} alt="Settings Icon" id="buttonPng"/>
            </button>
            <p id="settingsLabel">Settings</p>
            <p id="borderDouble"></p>

          </>
        )}
        <div id="headBorder"></div>
      </div>
      <div className="sideborders-container">
        <div className="border-left">
          <img src={SproutLeft} alt="Sprout 1" id="sproutLeft"/>
        </div>
        <div className="content">
        {currentPage === 'Settings' && <Settings userSeed={userSeed}/>}
        {currentPage === 'Main' && <Main userSeed={userSeed} public_key={public_key} />}
        {currentPage === 'Login' && <Login onPageChange={handlePageChange} onSetUserSeed={setUserSeed} onSetPublicKey={setPublicKey}/>}
      </div>
        <div className="border-right">

          <img src={SproutRight} alt="Sprout 2" id="sproutRight"/>
        </div>
      </div>
    </div>
  );
}

export default App;
