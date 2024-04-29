import React from "react";

function Input({ type, name, label, placeholderText, setForm, required }) {
  const handleInput = (e) => {
    const { name, value } = e.target;
    setForm((prev) => {
      return { ...prev, [name]: value };
    });
  };
  return (
    <label className="form-control w-full max-w-xs">
      <div className="label capitalize">
        <span className="label-text">{label}</span>
      </div>
      <input
        onChange={(e) => handleInput(e)}
        name={name}
        type={type}
        placeholder={placeholderText ?? "Type here..."}
        className="input input-bordered input-primary w-full max-w-xs"
        required={required ?? false}
      />
    </label>
  );
}

export default Input;
