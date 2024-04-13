import { useEffect, useState } from 'react';

/*

*/
function Main() {
// State to store the balance
const [balance, setBalance] = useState(0);

// Example functions that might be linked to buttons
const handleSend = () => {
  console.log('Send button clicked');
  // Integrate with backend functionality here
};

const handleSell = () => {
  console.log('Sell button clicked');
  // Integrate with backend functionality here
};

return (
  <div>
    <h1>Balance: ${balance.toFixed(2)}</h1>
    <div style={{ display: 'flex', justifyContent: 'space-evenly', marginTop: '20px' }}>
      <button onClick={handleSend}>Send</button>
      <button onClick={handleSell}>Sell</button>
    </div>
  </div>
);
}


export default Main;