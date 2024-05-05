import { FaGithub, FaLinkedin } from "react-icons/fa";
import { links } from "./NavLinks";
import { NavLink } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer p-10 bg-base-200 text-base-content w-full flex flex-col md:flex-row items-center justify-center gap-24">
      <nav className="grid grid-flow-col gap-4">
        <ul className="flex gap-4 flex-col">
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
        </ul>
      </nav>

      <aside>
        <form>
          <h6 className="footer-title">Newsletter</h6>
          <fieldset className="form-control w-80">
            <label className="label">
              <span className="label-text">Enter your email address</span>
            </label>
            <div className="join">
              <input
                type="text"
                placeholder="username@site.com"
                className="input input-bordered join-item"
              />
              <button className="btn btn-primary join-item">Subscribe</button>
            </div>
          </fieldset>
        </form>
      </aside>
      <aside>
        <nav>
          <h6 className="footer-title">Social</h6>
          <div className="grid grid-flow-col gap-4">
            <a className="link text-2xl" href="https://github.com/Ljusaj123">
              <FaGithub className="text-primary" />
            </a>
            <a
              className="link text-2xl"
              href="https://www.linkedin.com/in/rosana-lju%C5%A1aj-61765429a/"
            >
              <FaLinkedin className="text-primary" />
            </a>
          </div>
        </nav>
      </aside>
    </footer>
  );
}

export default Footer;
