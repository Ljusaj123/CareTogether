import { useState } from "react";

function Select({ options, label }) {
  const [selectedOption, setSelectedOption] = useState("");

  const handleSelectChange = () => {};

  return (
    <div>
      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">{label}</span>
        </div>
        <select
          onChange={handleSelectChange}
          value={selectedOption}
          className="select select-bordered"
        >
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
