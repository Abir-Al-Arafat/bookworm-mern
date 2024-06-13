import React from "react";
import Header from "./header/Header";
import Footer from "./footer/Footer";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <div style={{
        height: "100vh"
      }}></div>
      <Footer />
    </>
  );
};

export default Layout;
