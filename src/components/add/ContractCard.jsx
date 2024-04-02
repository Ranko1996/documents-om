import React, { useRef, useEffect } from 'react';
import './add.css'; // Učitavanje add.css fajla

const ContractCardModal = ({ contract, isOpen, setOpen }) => {
  const modalRef = useRef();

  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setOpen]);

  if (!isOpen) return null;

  return (
    <div className="add"> {/* Promenjena klasa za overlay */}
      <div className="modal" ref={modalRef}>
        <span className="close" onClick={() => setOpen(false)}>
          X
        </span>
        <h1>Detalji Ugovora</h1>
        <div className="contract-card-content">
          <p className="contract-info">Kupac: {contract.kupac}</p>
          <p className="contract-info">Broj ugovora: {contract.brojUgovora}</p>
          <p className="contract-info">Datum akontacije: {contract.datumAkontacije}</p>
          <p className="contract-info">Rok isporuke: {contract.rokIsporuke}</p>
          <p className="contract-info">Status: {contract.status}</p>
        </div>
      </div>
    </div>
  );
};

export default ContractCardModal;
