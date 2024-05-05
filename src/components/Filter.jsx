import { IoFilterOutline } from "react-icons/io5";

function Filter({ children }) {
  return (
    <div className="grid drawer-end z-10">
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
          {children}
        </div>
      </div>
    </div>
  );
}

export default Filter;
