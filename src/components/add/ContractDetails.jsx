import React from "react";
import "./add.css";

const ContractDetails = ({ contract, setOpen }) => {
  return (
    <div className="add modal-overlay"> {/* Dodavanje klase za overlay */}
      <div className="modal">
        <span className="close" onClick={() => setOpen(false)}>
          X
        </span>
        <h1>Prikaz dokumenta</h1>
        <div className="modal-content"> {/* Možete dodati ovu klasu u CSS ako želite specifične stilove za ovaj deo */}
          <p>ID: {contract.id}</p>
          <p>Kupac: {contract.kupac}</p>
          <p>Broj ugovora: {contract.brojUgovora}</p>
          <p>Datum akontacije: {contract.datumAkontacije}</p>
          <p>Rok isporuke: {contract.rokIsporuke}</p>
          <p>Status: {contract.status}</p>
          <h2>Proizvodi:</h2>
          <ul>
            {contract.proizvodi.map((proizvod) => (
              <li key={proizvod.id}>
                Naziv: {proizvod.naziv}, Dobavljač: {proizvod.dobavljac}, Status: {proizvod.status}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ContractDetails;
