import { useState } from "react";

function Select({ options, name, label, setValue }) {
  const [selectedOption, setSelectedOption] = useState("default");

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    setSelectedOption(value);
    setValue(name, value);
  };

  return (
    <div>
      <label className="form-control w-full max-w-xs">
        {label && (
          <div className="label">
            <span className="label-text">{label}</span>
          </div>
        )}
        <select
          onChange={handleSelectChange}
          name={name}
          className="select select-bordered"
          value={selectedOption}
        >
          <option disabled value="default">
            Select
          </option>
          {options.map((option, index) => {
            return (
              <option value={option} key={index}>
                {option}
              </option>
            );
          })}
        </select>
      </label>
    </div>
  );
}

export default Select;
