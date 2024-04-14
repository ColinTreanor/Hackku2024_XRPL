// Settings.js
import { useState, useEffect} from 'react';
import axios from 'axios';

import KoalaOnTree from './Design/Koala_on_Tree.png';

const serverUrl = 'http://127.0.0.1:5000';


function Settings( {userSeed} ) {

  const [publicKey, setPublicKey] = useState(null);
  const [address, setAddress] = useState(null);
  const [seedKey, setSeedKey] = useState(null);
  
  const get_account_info = async () => {
    try {

      const response = await axios.post(`${serverUrl}/account_info`, { seed: userSeed });
      console.log(response.data);

      const responseData = response.data;

      setPublicKey(responseData.public_key)
      setAddress(responseData.address)
      setSeedKey(responseData.seed)

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
      {publicKey &&(
        <img src={KoalaOnTree} alt="Koala On Tree" id="koalaOnTree"/>
      )}
      <h1 id="mainAccountInfo">Account Information</h1>
      
      {publicKey && (
        <div id="alignPublicKey">
          <h2 id="publicKeyText">Public Key:</h2>
          <h2 id="publicKey">{publicKey}</h2>
        </div>
      )}
      {address && (
        <div id="alignAddress">
          <h2 id="addressText">Address:</h2>
          <h2 id="address">{address}</h2>
        </div>
      )}
      {seedKey && (
        <div id="alignSeedKey">
          <h2 id="seedKeyText">Seed:</h2>
          <h2 id="seedKey">{seedKey}</h2>
        </div>
      )}
      {publicKey && address && seedKey && (
      <div id="devLetter">
        <p>Hello, this is a message from the devs!<br />Thank you
        so much for utilizing our application for your Crypto needs. Feel
        free to use any of the features on this platform at your convienence. If you
        have any questions, feel free to ask!</p>
        <p id="socials">info@koalawalla.com</p>
      </div>
      )}
    </div>
  );
}
export default Settings;