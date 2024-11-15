import React from "react";
import './RadioGroup.scss';

export default function RadioGroup({ label, options, selected, onChange }) {
    return (
        <>
            <label className="label">{label}</label>
            <div className="radio-group">
                {Object.entries(options).map(([key, value]) => (
                    <label key={key} className="radio-group__label">
                        <input
                            type="radio"
                            name={label}
                            value={key}
                            checked={selected === key}
                            onChange={(e) => onChange(e.target.value)}
                        />
                        {value}
                    </label>
                ))}
            </div>
        </>
    );
}
