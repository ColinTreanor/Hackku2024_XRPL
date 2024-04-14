import { useEffect, useState } from 'react';
import axios from 'axios';
import './index.css';
const serverUrl = 'http://127.0.0.1:5000'; // Update with your server URL

function Main({userSeed}) {
  // State to store the balance
  const [balance, setBalance] = useState('');
  // State to control the visibility of the send modal
  const [showSendModal, setShowSendModal] = useState(false);
  // States for the form inside the modal
  const [recipientPublicKey, setRecipientPublicKey] = useState('');
  const [amountToSend, setAmountToSend] = useState('');

  // Function to fetch the balance from the backend
  const getBalance = async () => {
    try {
      const response = await axios.post(`${serverUrl}/account_balance`, { seed: userSeed });
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

  useEffect(() => {
    // Fetch balance using userSeed here
    getBalance();
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
    // Close the modal
    setShowSendModal(false);
  };

  // Placeholder content for contacts and transactions
  const contactsList = ['Alice', 'Bob', 'Charlie'];
  const transactionHistoryList = ['Transaction 1', 'Transaction 2', 'Transaction 3'];


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
          <h1 className="balance">Balance: ${balance}</h1>
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
          {transactionHistoryList.map((transaction, index) => (
            <li key={index} className="listItem">{transaction}</li>
          ))}
        </ul>
      </div>

      {/* "Send" button event handler */}
      <button className="button" onClick={handleSendClick}>Send</button>
      
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