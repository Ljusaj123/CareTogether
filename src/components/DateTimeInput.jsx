import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function DateTimeInput({ label, required, setForm }) {
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    setForm((prev) => {
      return { ...prev, date: selectedDate.toISOString() };
    });
  }, []);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setForm((prev) => {
      return { ...prev, date: new Date(date).toISOString() };
    });
  };

  return (
    <label className="form-control w-full max-w-xs">
      <div className="label capitalize">
        <span className="label-text">
          {required && <span className="text-error">* </span>} {label}
        </span>
      </div>
      <DatePicker
        className="px-4 py-3 w-full border border-primary rounded-lg"
        selected={selectedDate}
        onChange={handleDateChange}
        dateFormat="yyyy-MM-dd HH:mm"
        showTimeInput
        required={required ?? false}
      />
    </label>
  );
}

export default DateTimeInput;
