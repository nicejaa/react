import React from "react";
import Header from "../components/Header";
import Container from "react-bootstrap/esm/Container";
import { Outlet } from "react-router-dom";
export default function Layout() {
  return (
    <div>
      <Header />
      <Container>
        <Outlet />
      </Container>
    </div>
  );
}
