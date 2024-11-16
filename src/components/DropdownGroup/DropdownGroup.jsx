import React from "react";
import "./DropdownGroup.scss";

export default function DropdownGroup({ label, options, selected, onChange }) {
    return (
        <div className="dropdown-group">
            <label className="label">{label}</label>
            <select
                className="drop-down__options"
                value={selected}
                onChange={(e) => onChange(e.target.value)}
            >
                {Object.entries(options).map(([key, value]) => (
                    <option key={key} value={key}>
                        {value}
                    </option>
                ))}
            </select>
        </div>
    );
}
