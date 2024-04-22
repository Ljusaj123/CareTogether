import { Outlet, useNavigation } from "react-router-dom";
import { Header, Footer } from "../components";

function Layout() {
  const navigation = useNavigation();
  const isPageLoading = navigation.state === "loading";

  return (
    <>
      <Header />
      {isPageLoading ? (
        <p>Loading</p>
      ) : (
        <section className="align-element py-20 min-h-screen">
          <Outlet />
        </section>
      )}
      <Footer />
    </>
  );
}

export default Layout;
