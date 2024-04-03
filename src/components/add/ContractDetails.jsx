import React from "react";
import "./add.css"; // Pretpostavljamo da su stilovi već uključeni

const ContractDetails = ({ contract, setOpen }) => {
  const getStatusStyle = (status) => {
    switch (status.toLowerCase()) {
      case "isporučeno":
        return "status isporuceno"; // Klasa za "Isporučeno"
      case "naručeno":
        return "status naruceno"; // Klasa za "Naručeno"
      case "kreirano":
        return "status kreirano"; // Klasa za "Kreirano"
      default:
        return "status"; // Podrazumevana klasa
    }
  };

  return (
    <div className="add modal-overlay">
      <div className="modal">
        <span className="close" onClick={() => setOpen(false)}>X</span>
        <h1>Prikaz dokumenta</h1>
        <div className="modal-content">
          <p>ID: {contract.id}</p>
          <p>Kupac: {contract.kupac}</p>
          <p>Broj ugovora: {contract.brojUgovora}</p>
          <p>Datum akontacije: {contract.datumAkontacije}</p>
          <p>Rok isporuke: {contract.rokIsporuke}</p>
          <p>Status: {contract.status}</p>
          <h2>Proizvodi:</h2>
          <ul className="product-list">
            {contract.proizvodi.map((proizvod) => (
              <li key={proizvod.id}>
                Naziv: {proizvod.naziv}, Dobavljač: {proizvod.dobavljac}, 
                <span className={getStatusStyle(proizvod.status)}>Status: {proizvod.status}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ContractDetails;
