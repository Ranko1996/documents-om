import React, { useState, useRef, useEffect } from "react";
import "./add.css";

const Edit = ({ setOpen, setContracts, id }) => {
  const [deliveryDate, setDeliveryDate] = useState(""); // Dodano za rok isporuke
  const [status, setStatus] = useState("");

  const modalRef = useRef();

  useEffect(() => {
    const fetchContract = async () => {
      try {
        const response = await fetch(`http://localhost:8080/ugovor/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch contract details.");
        }
        const data = await response.json();
        setDeliveryDate(data.rok_isporuke || ""); // Postavljanje početnog roka isporuke
        setStatus(data.status || "");
      } catch (error) {
        console.error("Error fetching contract:", error);
      }
    };

    if (id) fetchContract();
  }, [id]);

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

    const updatedContract = {
      rok_isporuke: deliveryDate,
      status: status,
    };

    try {
      const response = await fetch(`http://localhost:8080/editContract/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedContract),
      });

      if (!response.ok) {
        throw new Error("Failed to update the contract.");
      }

      // Ažuriranje lokalnog stanja ugovora nakon uspješne promjene
      setContracts((prevContracts) => prevContracts.map((c) => (c.id === id ? { ...c, ...updatedContract } : c)));
      setOpen(false); // Zatvaranje modala
    } catch (error) {
      console.error("Error updating contract:", error);
    }
  };

  const renderStatusOptions = () => {
    switch (status) {
      case "KREIRANO":
        return <option value="NARUČENO">NARUČENO</option>;
      case "NARUČENO":
        return <option value="ISPORUČENO">ISPORUČENO</option>;
      default:
        return null; // Ako status nije "KREIRANO" ni "NARUČENO", ne prikazuj opcije
    }
  };

  return (
    <div className="add">
      <div className="modal" ref={modalRef}>
        <span className="close" onClick={() => setOpen(false)}>X</span>
        <h1>Uredi Ugovor</h1>
        <form onSubmit={handleSubmit}>
          <div className="item">
            <label>Rok Isporuke</label>
            <input
              type="date"
              value={deliveryDate}
              onChange={(e) => setDeliveryDate(e.target.value)}
            />
          </div>
          <div className="item">
            <label>Status</label>
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value={status}>Trenutno: {status}</option>
              {renderStatusOptions()}
            </select>
          </div>
          <button type="submit">Spremi promjene</button>
        </form>
      </div>
    </div>
  );
};

export default Edit;
