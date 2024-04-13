import { useEffect, useState } from 'react';

function Main() {
  // State to store the balance
  const [balance, setBalance] = useState(0);

  // Function to fetch the balance from the backend
  const fetchBalance = async () => {
    try {
      // Replace this URL with the actual endpoint provided by your backend
      const response = await fetch('/api/balance');
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
    // Set up the polling interval
    const intervalId = setInterval(() => {
      fetchBalance(); // Call the function to update the balance
    }, 5000); // Poll every 5000 milliseconds (5 seconds)

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array means this effect runs once on mount


  // Placeholder content for contacts and transactions
  const contactsList = ['Alice', 'Bob', 'Charlie'];
  const transactionHistoryList = ['Transaction 1', 'Transaction 2', 'Transaction 3'];

  // Styles for the layout
  const styles = {
    container: {
      display: 'flex',
      justifyContent: 'space-between',
      width: '100%', // Ensure the container fills its parent
      maxWidth: '1200px', // Maximum width of the white box, adjust as needed
      height: '100%', // Adjust as necessary
      backgroundColor: '#fff', // Assuming the white box has a white background
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', // Optional: Adds shadow for depth
      padding: '20px',
      boxSizing: 'border-box', // Include padding in the width
    },
    column: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      padding: '20px',
      backgroundColor: 'rgba(0, 0, 0, 0.05)', // Light transparent background to visualize the column
      margin: '10px', // Space between columns
    },
    leftColumn: {
      flex: '0 0 15%', // Do not grow or shrink, set basis to 15%
    },
    centerColumn: {
      flex: '0 0 70%', // Do not grow or shrink, set basis to 70%
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
    },
    centerTopContainer: {
      borderBottom: '1px solid black',
      paddingBottom: '20px',
    },
    centerBottomContainer: {
      flex: 1,
      paddingTop: '20px',
    },
    rightColumn: {
      flex: '0 0 15%', // Do not grow or shrink, set basis to 15%
    },
    header: {
      fontSize: '1em',
      marginBottom: '10px',
    },
    list: {
      listStyleType: 'none',
      padding: 0,
      width: '100%',
    },
    listItem: {
      borderBottom: '1px solid #ddd',
      paddingBottom: '5px',
      marginBottom: '5px',
    },
    button: {
      marginBottom: '10px',
      cursor: 'pointer'
    },
    balance: {
      marginBottom: '20px'
    },
    graphPlaceholder: {
      width: '100%',
      height: '150px', // Set a fixed height for the placeholder
      backgroundColor: '#ccc', // Placeholder color
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '1em',
      color: '#666',
      marginTop: '20px',
    },
  };

  return (
    <div style={styles.container}>
      {/* First Column */}
      <div style={{ ...styles.column, ...styles.leftColumn }}>
        <h2 style={styles.header}>Contacts</h2>
        <ul style={styles.list}>
          {contactsList.map((contact, index) => (
            <li key={index} style={styles.listItem}>{contact}</li>
          ))}
        </ul>
      </div>

      {/* Second Column */}
      <div style={{ ...styles.column, flex: 2 }}> {/* Adjust flex value as needed for width */}
        <div style={styles.centerTopContainer}>
          <h1 style={styles.balance}>Balance: ${balance.toFixed(2)}</h1>
          <button style={styles.button} onClick={() => {}}>Send</button>
          <button style={styles.button} onClick={() => {}}>Sell</button>
        </div>
        <div style={styles.centerBottomContainer}>
          <div style={styles.graphPlaceholder}>
            XRP Value Graph Placeholder
          </div>
        </div>
      </div>

      {/* Third Column */}
      <div style={{ ...styles.column, ...styles.rightColumn }}>
        <h2 style={styles.header}>Transaction History</h2>
        <ul style={styles.list}>
          {transactionHistoryList.map((transaction, index) => (
            <li key={index} style={styles.listItem}>{transaction}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Main;
