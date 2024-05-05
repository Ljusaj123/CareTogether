import { FaBarsStaggered } from "react-icons/fa6";
import NavLinks from "./NavLinks";

function Navbar() {
  return (
    <nav>
      <div className="navbar align-element px-8">
        <div className="navbar-start">
          <div className="dropdown">
            <label className="btn btn-ghost md:hidden text-primary">
              <FaBarsStaggered className="h-6 w-6" />
            </label>
            <ul className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-200 rounded-box w-52">
              <NavLinks />
            </ul>
          </div>
        </div>
        <div className="navbar-center hidden md:flex">
          <ul className="menu menu-horizontal">
            <NavLinks />
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
