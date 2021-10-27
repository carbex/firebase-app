import React from "react";
import Navbar from "../navbar/Navbar";


function Layout({ children }) {
  return (
    <main style={{ margin: "40px", position: "relative" }}>
      <Navbar />
      {children}  
    </main>
  );
}

export default Layout;
