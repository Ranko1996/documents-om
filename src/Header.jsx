import React, { useState } from 'react';
import { BsEnvelopePaperFill, BsSearch, BsPlus } from 'react-icons/bs';
import Add from "./components/add/Add"

function Header({ OpenSidebar }) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const handleAddModalOpen = () => {
    setIsAddModalOpen(true);
  };

  return (
    <header className='header'>
      <div className='header-left'>
        <div className='search-container'>
          <input type='text' placeholder='Pretraga...' className='search-input' />
          <BsSearch className='search-icon' />
        </div>
        <button className='add-document-button' onClick={handleAddModalOpen}>
          <BsPlus className='add-document-icon' />
          Dodaj dokument
        </button>
      </div>
      <div className='header-right'>
        <BsEnvelopePaperFill className='icon' />
      </div>

      {/* Prikaz modala za dodavanje dokumenta ako je isAddModalOpen true */}
      {isAddModalOpen && <Add setOpen={setIsAddModalOpen} />}
    </header>
  );
}

export default Header;
