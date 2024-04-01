import React, { useState, useRef, useEffect } from "react";
import "./add.css";

const Add = ({ setOpen, setContracts }) => {
  const [customerName, setCustomerName] = useState("");
  const [contractNumber, setContractNumber] = useState("");
  const [startDate, setStartDate] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!customerName || !contractNumber || !startDate || !deliveryDate) {
      alert("Molimo popunite sva polja.");
      return;
    }

    const newDocument = {
      kupac: customerName,
      brojUgovora: `${contractNumber}/2024`,
      datumAkontacije: startDate,
      rokIsporuke: deliveryDate,
      status: "KREIRANO"
    };

    try {
      const response = await fetch('http://localhost:8080/addContract', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newDocument),
      });
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      setContracts(currentDocuments => [...currentDocuments, newDocument]);
      setOpen(false);
    } catch (error) {
      console.error('There was a problem adding the document:', error);
    }
  };

  return (
    <div className="add">
      <div className="modal" ref={modalRef}>
        <span className="close" onClick={() => setOpen(false)}>
          X
        </span>
        <h1>Dodaj Novi Ugovor</h1>
        <form onSubmit={handleSubmit}>
          <div className="item">
            <label>Ime Kupca</label>
            <input
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="Unesite ime kupca"
            />
          </div>
          <div className="item">
            <label>Broj Ugovora</label>
            <input
              type="number"
              value={contractNumber}
              onChange={(e) => setContractNumber(e.target.value)}
              placeholder="Unesite broj ugovora"
            />
          </div>
          <div className="item">
            <label>Datum Početka</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div className="item">
            <label>Rok Isporuke</label>
            <input
              type="date"
              value={deliveryDate}
              onChange={(e) => setDeliveryDate(e.target.value)}
            />
          </div>
          <button type="submit">Dodaj Ugovor</button>
        </form>
      </div>
    </div>
  );
};

export default Add;
