import React, { useState, useEffect } from 'react';
import ContractCard from './components/contract/ContractCard';
import './App.css';
import Header from './Header'
import Sidebar from './Sidebar'
import Home from './Home'

function App() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);  
  const [contracts, setContracts] = useState([]);

  useEffect(() => {
      fetch('http://localhost:8080/ugovori')
          .then(response => {
              if (!response.ok) {
                  throw new Error('Network response was not ok');
              }
              return response.json();
          })
          .then(data => {
              console.log(data);
              setContracts(data); // Pretpostavlja se da su podaci odgovora niz ugovora
          })
          .catch(error => {
              console.error('There was a problem fetching the contracts:', error);
          });
  }, []);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }

  return (
    <div className='grid-container'>
      <Header OpenSidebar={OpenSidebar} setContracts={setContracts} />
      {/* <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/> */}
      <Home contracts={contracts} />
    </div>
  )
}

export default App;
