import { BsMoonFill, BsSunFill } from "react-icons/bs";
import { FaBarsStaggered } from "react-icons/fa6";
import NavLinks from "./NavLinks";

function Navbar() {
  return (
    <nav>
      <div className="navbar align-element px-8">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <FaBarsStaggered className="h-6 w-6" />
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-200 rounded-box w-52"
            >
              <NavLinks />
            </ul>
          </div>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal">
            <NavLinks />
          </ul>
        </div>

        <div className="navbar-end">
          <label className="swap swap-rotate ">
            <input type="checkbox" />
            <BsSunFill className="swap-off h-4 w-4" />
            <BsMoonFill className="swap-on h-4 w-4" />
          </label>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
