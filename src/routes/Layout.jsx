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
        <main className="align-element py-12">
          <Outlet />
        </main>
      )}
      <Footer />
    </>
  );
}

export default Layout;
