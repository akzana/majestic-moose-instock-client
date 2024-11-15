import React from "react";
import "./DropdownGroup.scss";

export default function DropdownGroup({ label, options, selected, onChange }) {
    const isError = selected === ''; // Assume an empty string is the error state

    return (
        <div className="dropdown-group">
            <label className="label">{label}</label>
            <select
                className={`drop-down__options ${isError ? 'error' : ''}`}
                value={selected}
                onChange={(e) => onChange(e.target.value)}
            >
                {Object.entries(options).map(([key, value]) => (
                    <option key={key} value={key}>
                        {value}
                    </option>
                ))}
            </select>
            {isError && (
                <div className="error-message">This field is required</div>
            )}
        </div>
    );
}

