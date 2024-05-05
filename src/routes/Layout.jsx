import { Outlet, useNavigation } from "react-router-dom";
import { Header, Footer } from "../components";
import UserContext from "../context.js";
import { useState } from "react";

function Layout() {
  const navigation = useNavigation();
  const isPageLoading = navigation.state === "loading";
  const [isAdmin, setIsAdmin] = useState(true);

  return (
    <UserContext.Provider value={{ isAdmin, setIsAdmin }}>
      <Header />
      {isPageLoading ? (
        <p>Loading</p>
      ) : (
        <main className="align-element py-12 min-height-cover-screen">
          <Outlet />
        </main>
      )}
      <Footer />
    </UserContext.Provider>
  );
}

export default Layout;
