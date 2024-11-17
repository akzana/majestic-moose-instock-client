import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./EditWarehouseForm.scss";
import errorIcon from "../../assets/Icons/error-24px.svg";

function FormInput({ id, label, type, value, error, onChange, placeholder }) {
  return (
    <div className="warehouse-form__input-group">
      <label htmlFor={id} className="warehouse-form__label">
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={id}
        className={`warehouse-form__input ${
          error ? "warehouse-form__input--error" : ""
        }`}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      {error && (
        <p className="warehouse-form__error-message">
          <img
            src={errorIcon}
            alt="Error Icon"
            className="warehouse-form__error-icon"
          />
          {error}
        </p>
      )}
    </div>
  );
}

function EditWarehouseForm() {
  const { id } = useParams(); 
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    warehouseName: "",
    warehouseAddress: "",
    warehouseCity: "",
    warehouseCountry: "",
    contactName: "",
    contactPosition: "",
    contactPhone: "",
    contactEmail: "",
  });

  const [errorMessages, setErrorMessages] = useState({});

  useEffect(() => {
    const fetchWarehouseData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_URL}/api/warehouses/${id}`
        );
        const data = response.data[0];
        setFormData({
          warehouseName: data.warehouse_name,
          warehouseAddress: data.address,
          warehouseCity: data.city,
          warehouseCountry: data.country,
          contactName: data.contact_name,
          contactPosition: data.contact_position,
          contactPhone: data.contact_phone,
          contactEmail: data.contact_email,
        });
      } catch (error) {
        console.error("Error fetching warehouse data:", error);
        alert("Failed to fetch warehouse data.");
      }
    };

    fetchWarehouseData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const errors = {};
    const requiredFields = [
      { key: "warehouseName", message: "This field is required" },
      { key: "warehouseAddress", message: "This field is required" },
      { key: "warehouseCity", message: "This field is required" },
      { key: "warehouseCountry", message: "This field is required" },
      { key: "contactName", message: "This field is required" },
      { key: "contactPosition", message: "This field is required" },
    ];

    requiredFields.forEach(({ key, message }) => {
      if (formData[key].trim() === "") errors[key] = message;
    });

    if (!isValidPhoneNumber(formData.contactPhone)) {
      errors.contactPhone = "Invalid phone number";
    }

    if (!isValidEmail(formData.contactEmail)) {
      errors.contactEmail = "Invalid email address";
    }

    setErrorMessages(errors);
    return Object.keys(errors).length === 0;
  };

  const isValidPhoneNumber = (phone) => {
    let startIndex = 0;
    if (phone.startsWith("+1")) startIndex = 2;

    let digitCount = 0;
    for (let i = startIndex; i < phone.length; i++) {
      const char = phone[i];
      if (!isNaN(char) && char !== " ") digitCount++;
      else if (!["(", ")", "-", " "].includes(char)) return false;
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        await axios.put(
          `${import.meta.env.VITE_URL}/api/warehouses/${id}`,
          {
            warehouse_name: formData.warehouseName,
            address: formData.warehouseAddress,
            city: formData.warehouseCity,
            country: formData.warehouseCountry,
            contact_name: formData.contactName,
            contact_position: formData.contactPosition,
            contact_phone: formData.contactPhone,
            contact_email: formData.contactEmail,
          }
        );
        alert("Warehouse updated successfully! Redirecting to the home page...");
        navigate("/warehouses");
      } catch (err) {
        console.error("Error updating warehouse:", err);
        alert("Failed to update warehouse.");
      }
    }
  };

  return (
    <form className="warehouse-form" onSubmit={handleSubmit}>
      <div className="warehouse-form__section-wrapper">
        <section className="warehouse-form__section warehouse-form__section--details">
          <h2 className="warehouse-form__title">Warehouse Details</h2>
          <FormInput
            id="warehouseName"
            label="Warehouse Name"
            type="text"
            value={formData.warehouseName}
            error={errorMessages.warehouseName}
            onChange={handleChange}
            placeholder="Warehouse Name"
          />
          <FormInput
            id="warehouseAddress"
            label="Street Address"
            type="text"
            value={formData.warehouseAddress}
            error={errorMessages.warehouseAddress}
            onChange={handleChange}
            placeholder="Street Address"
          />
          <FormInput
            id="warehouseCity"
            label="City"
            type="text"
            value={formData.warehouseCity}
            error={errorMessages.warehouseCity}
            onChange={handleChange}
            placeholder="City"
          />
          <FormInput
            id="warehouseCountry"
            label="Country"
            type="text"
            value={formData.warehouseCountry}
            error={errorMessages.warehouseCountry}
            onChange={handleChange}
            placeholder="Country"
          />
        </section>

        <section className="warehouse-form__section warehouse-form__section--contact">
          <h2 className="warehouse-form__title">Contact Details</h2>
          <FormInput
            id="contactName"
            label="Contact Name"
            type="text"
            value={formData.contactName}
            error={errorMessages.contactName}
            onChange={handleChange}
            placeholder="Contact Name"
          />
          <FormInput
            id="contactPosition"
            label="Position"
            type="text"
            value={formData.contactPosition}
            error={errorMessages.contactPosition}
            onChange={handleChange}
            placeholder="Position"
          />
          <FormInput
            id="contactPhone"
            label="Phone Number"
            type="tel"
            value={formData.contactPhone}
            error={errorMessages.contactPhone}
            onChange={handleChange}
            placeholder="Phone Number"
          />
          <FormInput
            id="contactEmail"
            label="Email"
            type="email"
            value={formData.contactEmail}
            error={errorMessages.contactEmail}
            onChange={handleChange}
            placeholder="Email"
          />
        </section>
      </div>

      <div className="warehouse-form__actions">
        <div className="warehouse-form__actions-wrapper">
          <Link to="/warehouses" className="warehouse-form__cancel">
            Cancel
          </Link>
          <button type="submit" className="warehouse-form__submit">
            Save
          </button>
        </div>
      </div>
    </form>
  );
}

export default EditWarehouseForm;