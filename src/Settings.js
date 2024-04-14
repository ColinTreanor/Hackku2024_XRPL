// Settings.js
import { useState, useEffect} from 'react';
import axios from 'axios';
const serverUrl = 'http://127.0.0.1:5000';

function Settings( {userSeed} ) {

  const [publicKey, setPublicKey] = useState('');
  const [privateKey, setPrivateKey] = useState('');
  const [seedKey, setSeedKey] = useState('');
  
  const get_account_info = async () => {
    try {
      console.log(userSeed)
      const response = await axios.post(`${serverUrl}/account_info`, { seed: userSeed });
      console.log(response.data);
    } catch (err) {
      if (err.response) {
        // The request was made, but the server responded with a non-2xx status code
        console.error('Server responded with error status:', err.response.status);
        console.error('Response data:', err.response.data);
      } else if (err.request) {
          // The request was made but no response was received
          console.error('No response received:', err.request);
      } else {
          // Something happened in setting up the request that triggered an error
          console.error('Error setting up request:', err.message);
      }
    }
  };
  useEffect(() => {
    get_account_info(); //when page renders, gets info
  }, [userSeed])

  return (
    <div id="mainAccount">
      <h1 id="mainAccountInfo">Account Information</h1>
      <div id="alignPublicKey">
        <h2 id="publicKeyText">Public Key:</h2>
        <h2 id="publicKey">{publicKey}</h2>
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