import { useEffect, useState } from 'react';
import axios from 'axios';
const serverUrl = 'https://colintreanor.github.io'; // Update with your server URL

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

// Login component
function Login({ onPageChange, onSetUserSeed, onSetPublicKey}) {
  const [isFocused, setIsFocused] = useState(false); // State to control the input focus
  const [isHovered, setIsHovered] = useState(false); // State to control the input hover
  const [userInput, setUserInput] = useState(''); // State to store the user input
  const [error, setError] = useState(''); // State to store the error message
  const [loadingSubmit, setLoadingSubmit] = useState(false); // State to control the loading state
  const [loadingCreate, setLoadingCreate] = useState(false); 

  // Function to handle the input focus
  const handleFocus = () => {
    setIsFocused(true);
  };
 // Function to handle the input blur
  const handleBlur = () => {
    setIsFocused(false);
  };
// Function to handle the input hover
  const handleMouseEnter = () => {
    setIsHovered(true);
  };
// Function to handle the input mouse leave
  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  // Function to handle the input change
  const handleChange = (event) => {
    setUserInput(event.target.value);
  };
// Function to create a new wallet
  const loginSeed = async () => {
    try {
      if (!userInput || userInput.length !== 31) {
        setError('Seed must be 31 characters long');
        return;
      }
      //const response = await axios.post(`api/${serverUrl}/login`, { seed: userInput, value: 'newseed' });
      setLoadingSubmit(true);
      console.log(loadingSubmit) //debugging
      const response = await axios.post(`${serverUrl}/login`, { seed: userInput});
      console.log("Wallet created:", response.data);
      onSetUserSeed(userInput); // Update user seed state
      onSetPublicKey(response.data["public_key"])//Update user public key state
      setLoadingSubmit(false); //debugging

      
  onPageChange('Main');

    } catch (error) {
      console.error('Error creating wallet:', error.message);
      setError('Failed to create wallet');
      // Handle error as needed
    }
  };

  // Function to create a new wallet
  const signUpSeed = async () => {
    try{
      setLoadingCreate(true);
      const response = await axios.post(`${serverUrl}/login`, { seed: ""});
      console.log("Wallet created:", response.data);
      onSetUserSeed(response.data["secret"]); // Update user seed state
      onSetPublicKey(response.data["public_key"]); //Update user public key state
      setLoadingCreate(false);

  onPageChange('Main');

    } catch (error){
      console.error('Error creating wallet:', error.message);
      setError('Failed to create wallet');
      // Handle error as needed
    }

  };
  
// Render the login component
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
        <button className="submitSeed" type="text" onClick={loginSeed}>Login</button>
        {loadingSubmit && (<p id="loadingSubmit">Loading...</p>)}
      </div>
      <div id="centerOr">
      <h2 id="optionOr">Or</h2>
      </div>
      <div id="newSeedContainer">
      <button id="newSeed" type="button" onClick={signUpSeed}>Create New Account</button>
        {loadingCreate && (<p id="loadingCreate">Loading...</p>)}
      </div>
    </div>
  );
}

export default Login;

