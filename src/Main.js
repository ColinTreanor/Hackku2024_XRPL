import { useEffect, useState } from 'react';
import axios from 'axios';
import './index.css';
const serverUrl = 'http://127.0.0.1:5000'; // Update with your server URL

function Main({userSeed}) {
  // State to store the balance
  const [balance, setBalance] = useState(0);

  // Function to fetch the balance from the backend
const fetchBalance = async () => {
  try {
    // Use the userSeed in your API call
    const response = await axios.post(`${serverUrl}/balance`, { seed: userSeed });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setBalance(data.balance); // Assume the response has a balance field
    } catch (error) {
      console.error("Failed to fetch balance:", error);
      // Handle the error according to your app's requirements
    }
  };

  useEffect(() => {
    // Fetch balance using userSeed here
  }, [userSeed]); // Depend on userSeed so this runs when it changes


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
          <h1 className="balance">Balance: ${balance.toFixed(2)}</h1>
          <button className="button" onClick={() => {}}>Send</button>
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
    </div>
  );
}

export default Main;