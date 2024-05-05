import React from "react";

function Textarea({ label, name, required, setForm }) {
  const handleInput = (e) => {
    const { name, value } = e.target;
    setForm((prev) => {
      return { ...prev, [name]: value };
    });
  };

  return (
    <label className="form-control w-full max-w-xs">
      <div className="label capitalize">
        <span className="label-text">
          {required && <span className="text-error">* </span>} {label}
        </span>
      </div>
      <textarea
        id={name}
        name={name}
        className="textarea textarea-primary w-full"
        required={required ?? false}
        onChange={(e) => handleInput(e)}
      ></textarea>
    </label>
  );
}

export default Textarea;
