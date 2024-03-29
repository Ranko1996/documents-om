import React from 'react';
import './ContractCard.css';

const ContractCard = ({ contract }) => {
  return (
    <div className="contract-card">
      <h2 className="contract-title">{contract.kupac}</h2>
      <p className="contract-info">Broj ugovora: {contract.brojUgovora}</p>
      <p className="contract-info">Datum akontacije: {contract.datumAkontacije}</p>
      <p className="contract-info">Rok isporuke: {contract.rokIsporuke}</p>
      <p className="contract-info">Status: {contract.status}</p>
    </div>
  );
}

export default ContractCard;
