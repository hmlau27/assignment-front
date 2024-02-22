import React from "react";
import { Container } from "react-bootstrap";
import CarListing from "./CarListing";

const Home = () => {
  return (
    <Container className="mt-3">
      <CarListing />
    </Container>
  );
};

export default Home;
