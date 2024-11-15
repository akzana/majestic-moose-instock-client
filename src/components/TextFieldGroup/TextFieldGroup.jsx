export default function TextFieldGroup({ label, input, onChange }) {
    return (
        <>
            <label className="label">{label}</label>
            <input className="text-field__input" value={input} onChange={(e) => onChange(e.target.value)} />
        </>
    );
}
