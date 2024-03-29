import React from 'react';
import { BsEnvelopePaperFill, BsSearch, BsPlus } from 'react-icons/bs';

function Header({ OpenSidebar }) {
  return (
    <header className='header'>
      <div className='header-left'>
        <div className='search-container'>
          <input type='text' placeholder='Pretraga...' className='search-input' />
          <BsSearch className='search-icon' />
        </div>
        <button className='add-document-button'>
          <BsPlus className='add-document-icon' />
          Dodaj dokument
        </button>
      </div>
      <div className='header-right'>
        <BsEnvelopePaperFill className='icon' />
      </div>
    </header>
  );
}

export default Header;
