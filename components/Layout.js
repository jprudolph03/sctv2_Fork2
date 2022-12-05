import React from "react";
import { Container } from "semantic-ui-react";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <Container style={{ marginTop: "5rem" }}>{children}</Container>
    </>
  );
};

export default Layout;
