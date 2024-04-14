// Settings.js
import { useState} from 'react';

function Settings() {
  const [privateKey, setPrivateKey] = useState('');
  const [publicKey, setPublicKey] = useState('');
  const [seedKey, setSeedKey] = useState('');
  return (
    <div id="mainAccount">
      <h1 id="mainAccountInfo">Account Information</h1>
      <div id="alignPublicKey">
        <h2 id="publicKeyText">Public Key:</h2>
        <h2 id="publicKey">Mock Key</h2>
      </div>
      <div id="alignPrivateKey">
        <h2 id="privateKeyText">Private Key:</h2>
        <h2 id="privateKey">Mock Key</h2>
      </div>
      <div id="alignSeedKey">
        <h2 id="seedKeyText">Seed Key:</h2>
        <h2 id="seedKey">Mock Key</h2>
      </div>
      <div id="devLetter">
        <p>Hello, this is a message from the devs!<br />Thank you
        so much for utilization our application for your Crypto needs. Feel
        free to use any of the features on this platform at your convienence. If you
        have any questions, feel free to ask!</p>
        <p id="socials">info@koalawalla.com</p>
      </div>
    </div>
  );
}

export default Settings;
