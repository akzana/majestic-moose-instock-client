import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './AddWarehouseForm.scss';

function AddWarehouseForm() {
  const [warehouseName, setWarehouseName] = useState("");
  const [warehouseAddress, setWarehouseAddress] = useState("");
  const [warehouseCity, setWarehouseCity] = useState("");
  const [warehouseCountry, setWarehouseCountry] = useState("");
  const [contactName, setContactName] = useState("");
  const [contactPosition, setContactPosition] = useState(""); 
  const [contactPhone, setContactPhone] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e, setStateFunction) => {
    setStateFunction(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (validateForm()) {
      try {
        const response = await axios.post('/api/warehouses', {
          warehouseName,
          warehouseAddress,
          warehouseCity,
          warehouseCountry,
          contactName,
          contactPosition, 
          contactPhone,
          contactEmail,
        });

        if (response.status === 201) {
          setWarehouseName("");
          setWarehouseAddress("");
          setWarehouseCity("");
          setWarehouseCountry("");
          setContactName("");
          setContactPosition(""); 
          setContactPhone("");
          setContactEmail("");
          setSuccess(true);

          setTimeout(() => navigate("/warehouses"), 2000);
        }
      } catch (err) {
        setError("Failed to add warehouse. Please try again.");
      }
    }
  };

  const validateForm = () => {
    return (
      warehouseName.trim() !== "" &&
      warehouseAddress.trim() !== "" &&
      warehouseCity.trim() !== "" &&
      warehouseCountry.trim() !== "" &&
      contactName.trim() !== "" &&
      contactPosition.trim() !== "" && 
      isValidPhone(contactPhone) &&
      isValidEmail(contactEmail)
    );
  };

  const isValidPhone = (phone) => {
    const cleanedPhone = phone.split(" ").join("");
    return cleanedPhone.length === 10 && !isNaN(cleanedPhone);
  };

  const isValidEmail = (email) => {
    const atSymbolIndex = email.indexOf("@");
    const dotIndex = email.lastIndexOf(".");
    return (
      atSymbolIndex > 0 &&
      dotIndex > atSymbolIndex + 1 &&
      dotIndex < email.length - 1
    );
  };

  return (
    <form className="warehouse-form" onSubmit={handleSubmit}>
      <section className="warehouse-form__section warehouse-form__section--details">
        <h2 className="warehouse-form__title">Warehouse Details</h2>
        
        <label htmlFor="warehouse-name" className="warehouse-form__label">
          Warehouse Name
        </label>
        <input
          type="text"
          id="warehouse-name"
          className="warehouse-form__input"
          placeholder="Warehouse Name"
          value={warehouseName}
          onChange={(e) => handleChange(e, setWarehouseName)}
          required
        />

        <label htmlFor="warehouse-address" className="warehouse-form__label">
          Street Address
        </label>
        <input
          type="text"
          id="warehouse-address"
          className="warehouse-form__input"
          placeholder="Street Address"
          value={warehouseAddress}
          onChange={(e) => handleChange(e, setWarehouseAddress)}
          required
        />

        <label htmlFor="warehouse-city" className="warehouse-form__label">
          City
        </label>
        <input
          type="text"
          id="warehouse-city"
          className="warehouse-form__input"
          placeholder="City"
          value={warehouseCity}
          onChange={(e) => handleChange(e, setWarehouseCity)}
          required
        />

        <label htmlFor="warehouse-country" className="warehouse-form__label">
          Country
        </label>
        <input
          type="text"
          id="warehouse-country"
          className="warehouse-form__input"
          placeholder="Country"
          value={warehouseCountry}
          onChange={(e) => handleChange(e, setWarehouseCountry)}
          required
        />
      </section>

      <section className="warehouse-form__section warehouse-form__section--contact">
        <h2 className="warehouse-form__title">Contact Details</h2>

        <label htmlFor="contact-name" className="warehouse-form__label">
          Contact Name
        </label>
        <input
          type="text"
          id="contact-name"
          className="warehouse-form__input"
          placeholder="Contact Name"
          value={contactName}
          onChange={(e) => handleChange(e, setContactName)}
          required
        />

        <label htmlFor="contact-position" className="warehouse-form__label">
          Position
        </label>
        <input
          type="text"
          id="contact-position"
          className="warehouse-form__input"
          placeholder="Position"
          value={contactPosition}
          onChange={(e) => handleChange(e, setContactPosition)}
          required
        />

        <label htmlFor="contact-phone" className="warehouse-form__label">
          Phone Number
        </label>
        <input
          type="tel"
          id="contact-phone"
          className="warehouse-form__input"
          placeholder="Phone Number"
          value={contactPhone}
          onChange={(e) => handleChange(e, setContactPhone)}
          required
        />

        <label htmlFor="contact-email" className="warehouse-form__label">
          Email
        </label>
        <input
          type="email"
          id="contact-email"
          className="warehouse-form__input"
          placeholder="Email"
          value={contactEmail}
          onChange={(e) => handleChange(e, setContactEmail)}
          required
        />
      </section>

      <div className="warehouse-form__actions">
        <Link to="/warehouses" className="warehouse-form__cancel">
          Cancel
        </Link>

        <button type="submit" className="warehouse-form__submit">
          + Add Warehouse
        </button>
      </div>

      {success && <p className="warehouse-form__success">Warehouse added successfully!</p>}
      {error && <p className="warehouse-form__error">{error}</p>}
    </form>
  );
}

export default AddWarehouseForm;