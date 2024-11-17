import React from 'react';
import './TextFieldGroup.scss';

function TextFieldGroup({ label, input, onChange, type = "text", inputClassName = "", rows = 5 }) {
    const isError = input === '';
    return (
        <div className="text-field-group">
            <label className="text-field-group__label">{label}</label>
            {type === "textarea" ? (
                <textarea
                    className={`text-field-group__textarea ${isError ? 'error' : ''} ${inputClassName}`}
                    value={input}
                    onChange={(e) => onChange(e.target.value)}
                    rows={rows} // Set the number of visible lines for textarea
                />
            ) : (
                <input
                    type={type}
                    className={`text-field-group__input ${isError ? 'error' : ''} ${inputClassName}`}
                    value={input}
                    onChange={(e) => onChange(e.target.value)}
                />
            )}
            {isError && (
                <div className="error-message">This field is required</div>
            )}
        </div>
    );
}

export default TextFieldGroup;
