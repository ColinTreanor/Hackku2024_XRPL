import { useEffect, useState } from 'react';
import axios from 'axios';
import './index.css';
import KoalaGraph from './Design/XRP_Koala_Graph.png';

const serverUrl = 'https://colintreanor.github.io'; // Update with your server URL

// Main component
function Main({userSeed, public_key}) {
  // State to store the balance
  const [balance, setBalance] = useState('');
  const [otherBalance, setOtherBalance] = useState('');
  // State to control the visibility of the send and sell modal
  const [showSendModal, setShowSendModal] = useState(false);
  const [showSellModal, setShowSellModal] = useState(false);
  // States for the form inside the modal
  const [recipientPublicKey, setRecipientPublicKey] = useState('');
  const [amountToSend, setAmountToSend] = useState('');
  const [transactionInfo, setTransactionInfo] = useState({});
  const [isRefreshing, setIsRefreshing] = useState(false);

  const [loadSend, setLoadSend] = useState(false);
  const [refresh, setRefresh] = useState(false);

  // Function to simulate a refresh
  const simulateRefresh = () => {
    setIsRefreshing(true);
    // Delay the state change to false to simulate a refresh
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000); // Change this value to adjust the delay time
  };


  // Function to fetch the balance from the backend
  const getBalance = async () => {
    try {
      const response = await axios.post(`${serverUrl}/account_balance`, { pub_key: public_key });
      if (!response.data) {
        throw new Error(`Response data not found`);
      }
      const balance = response.data; // Accessing the data property directly
      setBalance(balance);
    } catch (error) {
      console.error("Failed to fetch balance:", error);
      // Handle the error according to your app's requirements
    }
  };

  // Function to fetch the balance from the backend
  const getTransaction = async () => {
    try {
      const response = await axios.post(`${serverUrl}/send_transaction_info`, { seed: userSeed });
      if (!response.data) {
        throw new Error(`Response data not found`);
      }
      const transactionInfo = response.data; // Accessing the data property directly
      setTransactionInfo(transactionInfo); 
    } catch (error) {
      console.error("Failed to fetch balance:", error);
      // Handle the error according to your app's requirements
    }
  };

  // Function to fetch the balance from the backend
  const getBalanceOther = async () => {
    try {
      const response = await axios.post(`${serverUrl}/account_balance`, { pub_key: recipientPublicKey });
      if (!response.data) {
        throw new Error(`Response data not found`);
      }
      const otherBalance = response.data; // Accessing the data property directly
      setOtherBalance(otherBalance);
    } catch (error) {
      console.error("Failed to fetch balance:", error);
      // Handle the error according to your app's requirements
    }
  };

  function refresh_balance() {
    getBalance();
    //getBalanceOther();
    simulateRefresh();
    getTransaction();
    console.log("Balance Updated");
  };

  const send_xrp = async () => {
    try {
      const response = await axios.post(`${serverUrl}/send_xrp`, { seed: userSeed, amount: amountToSend, recipient: recipientPublicKey });
      if (!response.data) {
        throw new Error(`Response data not found`);
      }
    } catch (error) {
      console.error("Failed to fetch balance:", error);
      // Handle the error according to your app's requirements
    }
    console.log("Sent Money");
  };

  useEffect(() => {
    // Fetch balance using userSeed here
    getBalance();
    getTransaction();
  }, [userSeed]); // Depend on userSeed so this runs when it changes

   // Function to handle the send button click
   const handleSendClick = () => {
    setShowSendModal(true);
  };

  // Function to handle closing the modal
  const handleCloseModal = () => {
    setShowSendModal(false);
  };

  // Function to handle the submission of the send form
  const handleSendSubmit = async () => {
    // Here you would send the data to the backend
    // For now, we'll just log it to the console and close the modal
    setLoadSend(true);
    console.log('Sending', amountToSend,'\nto', recipientPublicKey);
    await send_xrp();
    // Close the modal
    setShowSendModal(false);
    setLoadSend(false);
    refresh_balance();
  };

   // Function to handle the sell button click
   const handleSellClick = () => {
    setShowSellModal(true);
  };

  // Function to handle closing the sell modal
  const handleCloseSellModal = () => {
    setShowSellModal(false);
  };
  

  // Placeholder content for contacts and transactions
  const contactsList = ['Colin', 'Kyle', 'Alex', 'Nick'];
  // const transactionHistoryList = ['Transaction 1', 'Transaction 2', 'Transaction 3'];

// Return the JSX to render
  return (
    <div id="mainContainer">
      {/* First Column */}
      <div id="leftColumn" className="column">
        <h2 id="headerContacts">Contacts</h2>
        <ul id="listContacts">
          {contactsList.map((contact, index) => (
            <p key={index} className="listItem">{contact}</p>
          ))}
        </ul>
      </div>

      {/* Second Column */}
      <div id="centerColumn" className="column">
        <div>
          <h1 className="balance">Balance: {balance}</h1>
          <h2 id="unitToken">XRP</h2>
          <button id="buttonOne" onClick={handleSendClick}>Send</button>
          <button id="buttonTwo" onClick={handleSellClick}>Sell</button>
          <button id="buttonThree" onClick={refresh_balance}>Refresh Balance</button>
          {isRefreshing && <div className="loading-wheel"></div>}

          <div id="koalaGraph">
            <img src={KoalaGraph} alt="Koala Graph" id="koalaGraph"/>
          </div>
        </div>
      </div>

      {/* Third Column */}
      <div id="rightColumn" className="column">
        <h2 id="headerTransaction">Last Transaction</h2>
        <ul className="transactionList">
        {Object.entries(transactionInfo).map(([key, value]) => (
        key === "Amount" ? <p className="itemTransaction" key={key}> 
        {`${transactionInfo.isSentTransaction ? "-" : "+"}${Math.abs(value) / 1000000} Recipient: ${transactionInfo.Other}`}
        </p> : null))}
        </ul>
      </div>
      
      {/* Send Modal */}
      {showSendModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleCloseModal}>&times;</span>
            <h2>Send Funds</h2>
            <label id="labelRecipient" htmlFor="recipientPublicKey">Recipient Public Key:</label>
            <input
              type="text"
              id="recipientPublicKey"
              value={recipientPublicKey}
              onChange={e => setRecipientPublicKey(e.target.value)}
            />
            <label id="labelAmount" htmlFor="amountToSend"><br/>Amount to Send:</label>
            <input
              type="number"
              id="amountToSend"
              value={amountToSend}
              onChange={e => setAmountToSend(e.target.value)}
            />
            <button id="buttonSendTransaction" onClick={handleSendSubmit}>Submit</button>
            {loadSend && (
              <p id="loadingSend">Loading...</p>
            )}
          </div>
        </div>
      )}

      {/* Sell Modal */}
      {showSellModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleCloseSellModal}>&times;</span>
            <h2>Congratulations! You have sold all of your XRP!</h2>
          </div>
        </div>
      )}
    </div>
  );
}

export default Main;