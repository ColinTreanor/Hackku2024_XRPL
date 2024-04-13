import { useEffect, useState } from 'react';
import axios from 'axios';
const serverUrl = 'http://127.0.0.1:5000';

/* 
Functionality:

Two Options:

1. Create Wallet
    Call a JS function that sends request to backend. create_account()

2. Enter Seed: (already have wallet)
    Cannot submit if:
        Empty
        length is not 31.

    If submitted:

        Call JS function to go to backend. get_account(seed)

Notes:
    HANDLE ERRORS

*/


function Login() {
  const [isFocused, setIsFocused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [error, setError] = useState('');

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  const handleChange = (event) => {
    setUserInput(event.target.value);
  };

  const loginSeed = async () => {
    try {
      if (!userInput || userInput.length !== 31) {
        setError('Seed must be 31 characters long');
        return;
      }
      const response = await axios.post(`${serverUrl}/home/login`, { seed: userInput, value: 'newseed' });
      console.log("Wallet created:", response.data);
      // Handle successful response as needed
    } catch (error) {
      console.error('Error creating wallet:', error.message);
      setError('Failed to create wallet');
      // Handle error as needed
    }
  };
  

  return (
    <div className="loginContainer">
      <h1 id="loginHeader">Login</h1>
      <div className="inputContainer">
        {/* Input field */}
        <input
          id="inputSeed"
          className="input-seed"
          type="text"
          placeholder="Seed Entry"
          onFocus={handleFocus}
          onBlur={handleBlur}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          value={userInput} // Set input value to userInput state
          onChange={handleChange} // Handle input change
        />
        {/* Border element */}
        <div id="positionBorder">
          <div className={`inputBorder ${isFocused || isHovered ? 'focused' : ''}`}></div>
        </div>
      </div>
      <div id="centerSubmitButton">
        <button className="submitSeed" type="text" onClick={loginSeed}>Create</button>
      </div>
      <div id="centerOr">
      <h2 id="optionOr">Or</h2>
      </div>
      <div id="newSeedContainer">
      <button id="newSeed">Create New Seed</button>
      </div>
    </div>
  );
}

export default Login;

