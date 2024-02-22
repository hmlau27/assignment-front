import React from "react";
import { Col, Container, Form, Row } from "react-bootstrap";

const FilterCar = ({
  handleFilterInputChange,
  filterDate,
  handleFilterSubmit,
}) => {
  return (
    <Container>
      <Form onSubmit={handleFilterSubmit}>
        <Row className="justify-content-center align-items-center my-4">
          <Col md={4} className="mb-3 mb-md-0">
            <Form.Control
              placeholder="rent start"
              value={filterDate.startDate}
              onChange={(e) => handleFilterInputChange(e)}
              type="date"
              id="startDate"
              name="startDate"
            />
          </Col>
          <Col md={4} className="mb-3 mb-md-0">
            <Form.Control
              placeholder="rent end"
              value={filterDate.endDate}
              onChange={(e) => handleFilterInputChange(e)}
              type="date"
              id="endDate"
              name="endDate"
            />
          </Col>
          <Col md={2}>
            <button className="btn btn-outline-secondary" type="submit">
              Filter
            </button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default FilterCar;
