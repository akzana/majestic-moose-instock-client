import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./AddWarehouseForm.scss";
import errorIcon from "../../assets/Icons/error-24px.svg";

function AddWarehouseForm() {
  const [warehouseName, setWarehouseName] = useState("");
  const [warehouseAddress, setWarehouseAddress] = useState("");
  const [warehouseCity, setWarehouseCity] = useState("");
  const [warehouseCountry, setWarehouseCountry] = useState("");
  const [contactName, setContactName] = useState("");
  const [contactPosition, setContactPosition] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [errorMessages, setErrorMessages] = useState({
    warehouseName: "",
    warehouseAddress: "",
    warehouseCity: "",
    warehouseCountry: "",
    contactName: "",
    contactPosition: "",
    contactPhone: "",
    contactEmail: "",
  });

  const navigate = useNavigate();

  const handleChange = (e, setStateFunction) => {
    setStateFunction(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_APP_API_URL}/api/warehouses`,
          {
            warehouse_name: warehouseName,
            address: warehouseAddress,
            city: warehouseCity,
            country: warehouseCountry,
            contact_name: contactName,
            contact_position: contactPosition,
            contact_phone: contactPhone,
            contact_email: contactEmail,
          }
        );

        if (response.status === 201) {
          alert(
            "Warehouse added successfully! Redirecting to the home page..."
          );
          setWarehouseName("");
          setWarehouseAddress("");
          setWarehouseCity("");
          setWarehouseCountry("");
          setContactName("");
          setContactPosition("");
          setContactPhone("");
          setContactEmail("");
          setErrorMessages({
            warehouseName: "",
            warehouseAddress: "",
            warehouseCity: "",
            warehouseCountry: "",
            contactName: "",
            contactPosition: "",
            contactPhone: "",
            contactEmail: "",
          });
          navigate("/warehouses");
        }
      } catch (err) {
        console.error("Error adding warehouse:", err);
        alert("Failed to add the warehouse. Please try again.");
      }
    }
  };

  const validateForm = () => {
    let valid = true;
    const errors = {};

    if (warehouseName.trim() === "") {
      errors.warehouseName = "This field is required";
      valid = false;
    }
    if (warehouseAddress.trim() === "") {
      errors.warehouseAddress = "This field is required";
      valid = false;
    }
    if (warehouseCity.trim() === "") {
      errors.warehouseCity = "This field is required";
      valid = false;
    }
    if (warehouseCountry.trim() === "") {
      errors.warehouseCountry = "This field is required";
      valid = false;
    }
    if (contactName.trim() === "") {
      errors.contactName = "This field is required";
      valid = false;
    }
    if (contactPosition.trim() === "") {
      errors.contactPosition = "This field is required";
      valid = false;
    }
    if (!isValidPhoneNumber(contactPhone)) {
      errors.contactPhone = "This field is required";
      valid = false;
    }
    if (!isValidEmail(contactEmail)) {
      errors.contactEmail = "This field is required";
      valid = false;
    }

    setErrorMessages(errors);
    return valid;
  };

  const isValidPhoneNumber = (phone) => {
    let startIndex = 0;
    if (phone.startsWith("+1")) {
      startIndex = 2;
    }

    let digitCount = 0;
    for (let i = startIndex; i < phone.length; i++) {
      const char = phone[i];
      if (!isNaN(char) && char !== " ") {
        digitCount++;
      } else if (char === "(" || char === ")" || char === "-" || char === " ") {
        continue;
      } else {
        return false;
      }
    }
    return digitCount === 10;
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
          className={`warehouse-form__input ${
            errorMessages.warehouseName ? "warehouse-form__input--error" : ""
          }`}
          placeholder="Warehouse Name"
          value={warehouseName}
          onChange={(e) => handleChange(e, setWarehouseName)}
        />
        {errorMessages.warehouseName && (
          <p className="warehouse-form__error-message">
            <img
              src={errorIcon}
              alt="Error Icon"
              className="warehouse-form__error-icon"
            />
            {errorMessages.warehouseName}
          </p>
        )}

        <label htmlFor="warehouse-address" className="warehouse-form__label">
          Street Address
        </label>
        <input
          type="text"
          id="warehouse-address"
          className={`warehouse-form__input ${
            errorMessages.warehouseAddress ? "warehouse-form__input--error" : ""
          }`}
          placeholder="Street Address"
          value={warehouseAddress}
          onChange={(e) => handleChange(e, setWarehouseAddress)}
        />
        {errorMessages.warehouseAddress && (
          <p className="warehouse-form__error-message">
              <img
              src={errorIcon}
              alt="Error Icon"
              className="warehouse-form__error-icon"
            />
            {errorMessages.warehouseAddress}
          </p>
        )}

        <label htmlFor="warehouse-city" className="warehouse-form__label">
          City
        </label>
        <input
          type="text"
          id="warehouse-city"
          className={`warehouse-form__input ${
            errorMessages.warehouseCity ? "warehouse-form__input--error" : ""
          }`}
          placeholder="City"
          value={warehouseCity}
          onChange={(e) => handleChange(e, setWarehouseCity)}
        />
        {errorMessages.warehouseCity && (
          <p className="warehouse-form__error-message">
              <img
              src={errorIcon}
              alt="Error Icon"
              className="warehouse-form__error-icon"
            />
            {errorMessages.warehouseCity}
          </p>
        )}

        <label htmlFor="warehouse-country" className="warehouse-form__label">
          Country
        </label>
        <input
          type="text"
          id="warehouse-country"
          className={`warehouse-form__input ${
            errorMessages.warehouseCountry ? "warehouse-form__input--error" : ""
          }`}
          placeholder="Country"
          value={warehouseCountry}
          onChange={(e) => handleChange(e, setWarehouseCountry)}
        />
        {errorMessages.warehouseCountry && (
          <p className="warehouse-form__error-message">
              <img
              src={errorIcon}
              alt="Error Icon"
              className="warehouse-form__error-icon"
            />
            {errorMessages.warehouseCountry}
          </p>
        )}
      </section>

      <section className="warehouse-form__section warehouse-form__section--contact">
        <h2 className="warehouse-form__title">Contact Details</h2>

        <label htmlFor="contact-name" className="warehouse-form__label">
          Contact Name
        </label>
        <input
          type="text"
          id="contact-name"
          className={`warehouse-form__input ${
            errorMessages.contactName ? "warehouse-form__input--error" : ""
          }`}
          placeholder="Contact Name"
          value={contactName}
          onChange={(e) => handleChange(e, setContactName)}
        />
        {errorMessages.contactName && (
          <p className="warehouse-form__error-message">
              <img
              src={errorIcon}
              alt="Error Icon"
              className="warehouse-form__error-icon"
            />
            {errorMessages.contactName}
          </p>
        )}

        <label htmlFor="contact-position" className="warehouse-form__label">
          Position
        </label>
        <input
          type="text"
          id="contact-position"
          className={`warehouse-form__input ${
            errorMessages.contactPosition ? "warehouse-form__input--error" : ""
          }`}
          placeholder="Position"
          value={contactPosition}
          onChange={(e) => handleChange(e, setContactPosition)}
        />
        {errorMessages.contactPosition && (
          <p className="warehouse-form__error-message">
              <img
              src={errorIcon}
              alt="Error Icon"
              className="warehouse-form__error-icon"
            />
            {errorMessages.contactPosition}
          </p>
        )}

        <label htmlFor="contact-phone" className="warehouse-form__label">
          Phone Number
        </label>
        <input
          type="tel"
          id="contact-phone"
          className={`warehouse-form__input ${
            errorMessages.contactPhone ? "warehouse-form__input--error" : ""
          }`}
          placeholder="Phone Number"
          value={contactPhone}
          onChange={(e) => handleChange(e, setContactPhone)}
        />
        {errorMessages.contactPhone && (
          <p className="warehouse-form__error-message">
              <img
              src={errorIcon}
              alt="Error Icon"
              className="warehouse-form__error-icon"
            />
            {errorMessages.contactPhone}
          </p>
        )}

        <label htmlFor="contact-email" className="warehouse-form__label">
          Email
        </label>
        <input
          type="email"
          id="contact-email"
          className={`warehouse-form__input ${
            errorMessages.contactEmail ? "warehouse-form__input--error" : ""
          }`}
          placeholder="Email"
          value={contactEmail}
          onChange={(e) => handleChange(e, setContactEmail)}
        />
        {errorMessages.contactEmail && (
          <p className="warehouse-form__error-message">
              <img
              src={errorIcon}
              alt="Error Icon"
              className="warehouse-form__error-icon"
            />
            {errorMessages.contactEmail}
          </p>
        )}
      </section>

      <div className="warehouse-form__actions">
        <Link to="/warehouses" className="warehouse-form__cancel">
          Cancel
        </Link>
        <button type="submit" className="warehouse-form__submit">
          + Add Warehouse
        </button>
      </div>
    </form>
  );
}

export default AddWarehouseForm;
