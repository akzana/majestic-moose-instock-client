import React from 'react';
import './TextFieldGroup.scss'

function TextFieldGroup({ label, input, onChange }) {
    const isError = input === '';

    return (
        <div className="text-field-group">
            <label className="text-field-group__label">{label}</label>
            <input
                className={`text-field-group__input ${isError ? 'error' : ''}`}
                value={input}
                onChange={(e) => onChange(e.target.value)}
            />
            {isError && (
                <div className="error-message">This field is required</div>
            )}
        </div>
    );
}

export default TextFieldGroup;

