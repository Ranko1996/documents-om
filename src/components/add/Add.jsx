import React, { useState } from "react";
import { BsCalendar } from "react-icons/bs";
import "./add.css";

const Add = ({ setOpen, setContracts }) => {
  const [documentName, setDocumentName] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [contractNumber, setContractNumber] = useState("");
  const [startDate, setStartDate] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

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

      // Dodavanje novog dokumenta u stanje aplikacije
      setContracts(currentDocuments => [...currentDocuments, newDocument]);
      setOpen(false);
    } catch (error) {
      console.error('There was a problem adding the document:', error);
    }
  };

  return (
    <div className="add">
      <div className="modal">
        <span className="close" onClick={() => setOpen(false)}>
          X
        </span>
        <h1>Add New Document</h1>
        <form onSubmit={handleSubmit}>
          <div className="item">
            <label>Customer Name</label>
            <input
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="Enter customer name"
            />
          </div>
          <div className="item">
            <label>Contract Number</label>
            <input
              type="number"
              value={contractNumber}
              onChange={(e) => setContractNumber(e.target.value)}
              placeholder="Enter contract number"
            />
          </div>
          <div className="item">
            <label>Start Date</label>
            <div className="date-input-container">
              <BsCalendar className="calendar-icon" />
              <input
                id="datePicker"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
          </div>
          <div className="item">
            <label>Delivery Date</label>
            <div className="date-input-container">
              <BsCalendar className="calendar-icon" />
              <input
                id="deliveryDatePicker"
                type="date"
                value={deliveryDate}
                onChange={(e) => setDeliveryDate(e.target.value)}
              />
            </div>
          </div>
          <button type="submit">Add Document</button>
        </form>
      </div>
    </div>
  );
};

export default Add;
