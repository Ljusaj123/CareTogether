import { NavLink } from "react-router-dom";

export const links = [
  { id: 1, url: "/", text: "home" },
  { id: 2, url: "/activities", text: "Activities" },
  { id: 3, url: "/volunteers", text: "Valunteers" },
  { id: 4, url: "/associations", text: "Associations" },
];
const NavLinks = () => {
  return (
    <>
      {links.map((link) => {
        const { id, url, text } = link;
        if ((url === "checkout" || url === "orders") && !user) return null;
        return (
          <li key={id} className="mx-4">
            <NavLink className="capitalize bg-ghost text-primary" to={url}>
              {text}
            </NavLink>
          </li>
        );
      })}
    </>
  );
};

export default NavLinks;
