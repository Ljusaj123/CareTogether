import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Header, Footer } from "../components";
import UserContext from "../context.js";

function Layout() {
  const [isAdmin, setIsAdmin] = useState(true);

  return (
    <UserContext.Provider value={{ isAdmin, setIsAdmin }}>
      <Header />
      <main className="align-element py-12 min-height-cover-screen">
        <Outlet />
      </main>
      <Footer />
    </UserContext.Provider>
  );
}

export default Layout;
