import React, { useContext } from "react";
import Navbar from "./Navbar";
import UserContext from "../context";

function Header() {
  const { isAdmin, setIsAdmin } = useContext(UserContext);

  console.log(isAdmin);
  return (
    <header className="bg-neutral py-2 text-base-content flex items-center justify-between md:justify-center">
      <Navbar />
      <div className="form-control">
        <label className="cursor-pointer flex items-center gap-4 mx-2">
          <span className="label-text text-primary">Admin</span>
          <input
            type="checkbox"
            className="toggle toggle-primary"
            checked={isAdmin}
            onChange={() => setIsAdmin(!isAdmin)}
          />
        </label>
      </div>
    </header>
  );
}

export default Header;
