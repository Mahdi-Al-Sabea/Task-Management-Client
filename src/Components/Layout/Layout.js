import { Outlet } from 'react-router-dom';
import Header from "./Header.js";

const Layout = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet /> {/* This will render Dashboard/Projects */}
      </main>
    </>
  );
};

export default Layout;