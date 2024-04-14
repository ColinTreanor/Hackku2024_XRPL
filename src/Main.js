import { useEffect, useState } from 'react';
import axios from 'axios';
import './index.css';
const serverUrl = 'http://127.0.0.1:5000'; // Update with your server URL

function Main({userSeed, public_key}) {
  // State to store the balance
  const [balance, setBalance] = useState('');
  const [otherBalance, setOtherBalance] = useState('');
  // State to control the visibility of the send modal
  const [showSendModal, setShowSendModal] = useState(false);
  // States for the form inside the modal
  const [recipientPublicKey, setRecipientPublicKey] = useState('');
  const [amountToSend, setAmountToSend] = useState('');
  const [transactionHistoryList, setTransactionHistory] = useState('');


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
    getBalanceOther();

    console.log("Balance Updated");
  };

  const getTransactionHistory = async () => {
    try {
      const response = await axios.post(`${serverUrl}/send_transaction_info`, { seed: userSeed });
      if (!response.data) {
        throw new Error(`Response data not found`);
      }
      const transactionHistoryList = response.data; // Accessing the data property directly
      setTransactionHistory(transactionHistoryList);
    } catch (error) {
      console.error("Failed to fetch balance:", error);
      // Handle the error according to your app's requirements
    }
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
    getTransactionHistory();
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
    console.log('Sending', amountToSend,'\nto', recipientPublicKey);
    await send_xrp();
    // Close the modal
    setShowSendModal(false);
    refresh_balance();
  };

  // Placeholder content for contacts and transactions
  const contactsList = ['Alice', 'Bob', 'Charlie'];
  // const transactionHistoryList = ['Transaction 1', 'Transaction 2', 'Transaction 3'];


  return (
    <div id="mainContainer">
      {/* First Column */}
      <div id="leftColumn" className="column">
        <h2 className="header">Contacts</h2>
        <ul className="list">
          {contactsList.map((contact, index) => (
            <li key={index} className="listItem">{contact}</li>
          ))}
        </ul>
      </div>

      {/* Second Column */}
      <div id="centerColumn" className="column">
        <div className="centerTopContainer">
          <h1 className="balance">Balance: {balance}XRP</h1>
          <button className="button" onClick={handleSendClick}>Send</button>
          <button className="button" onClick={() => {}}>Sell</button>
        </div>
        <div className="centerBottomContainer">
          <div className="graphPlaceholder">
            XRP Value Graph Placeholder
          </div>
        </div>
      </div>

      {/* Third Column */}
      <div id="rightColumn" className="column">
        <h2 className="header">Transaction History</h2>
        <ul className="list">
          ${transactionHistoryList}
        </ul>
      </div>
      
      {/* Send Modal */}
      {showSendModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleCloseModal}>&times;</span>
            <h2>Send Funds</h2>
            <label htmlFor="recipientPublicKey">Recipient Public Key:</label>
            <input
              type="text"
              id="recipientPublicKey"
              value={recipientPublicKey}
              onChange={e => setRecipientPublicKey(e.target.value)}
            />
            <label htmlFor="amountToSend">Amount to Send:</label>
            <input
              type="number"
              id="amountToSend"
              value={amountToSend}
              onChange={e => setAmountToSend(e.target.value)}
            />
            <button className="button" onClick={handleSendSubmit}>Submit</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Main;