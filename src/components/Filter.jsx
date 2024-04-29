import React from "react";
import { IoFilterOutline } from "react-icons/io5";
import Select from "./Select";
import Input from "./Input";
import RadioGroup from "./RadioGroup";

function Filter() {
  return (
    <div className="grid drawer-end">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <label htmlFor="my-drawer" className="btn btn-primary drawer-button">
          <IoFilterOutline /> Filter
        </label>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>

        <div className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
          <h2 className="text-2xl my-8">Add filters</h2>
          <form action="">
            <Input />
            <Select label="sort by" options={["name a-z", "name z-a"]} />
            <RadioGroup />
            <Input />
            <button className="btn btn-secondary" type="submit">
              Filter
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Filter;
