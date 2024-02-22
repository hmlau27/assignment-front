import { Alert, Col, Container, Row } from "react-bootstrap";
import { getAllCars, removeCar } from "../../utils/ApiCalls";
import { useEffect, useState } from "react";
import CarTable from "../common/CarTable";
import AddCarModel from "./AddCarModel";
import { Navigate } from "react-router-dom";

const ManageCars = () => {
  const [cars, setCars] = useState([]);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const closeModal = () => setShowModal(false);
  const openModal = () => setShowModal(true);

  const fetchCars = async () => {
    setIsLoading(true);
    try {
      const response = await getAllCars();
      setCars(response);
    } catch (error) {
      setMessage(error.message);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchCars();
  }, []);

  const handleCarRemoving = async (carId) => {
    try {
      const response = await removeCar(carId);
      setMessage(response);
      setCars(cars.filter((car) => car.carId !== carId));
    } catch (error) {
      setMessage(error.message);
    }
  };

  return localStorage.getItem("role") == null ||
    localStorage.getItem("role") !== "ADMIN" ? (
    <Navigate to={"/auth/sign-in"} />
  ) : (
    <Container className="mt-3">
      <AddCarModel
        showModal={showModal}
        handleClose={closeModal}
        setMessage={setMessage}
        fetchCars={fetchCars}
      />
      {isLoading && <p>Loading...</p>}
      {message && (
        <Alert
          variant={`${message.includes("successfully") ? "success" : "danger"}`}
        >
          {message}
        </Alert>
      )}
      {cars && (
        <Row>
          <Row className="mb-4 align-items-center">
            <Col xs={10}>
              <h3>Cars Listing</h3>
            </Col>
            <Col xs={2} className="d-flex justify-content-end">
              <button className="btn btn-outline-primary" onClick={openModal}>
                +
              </button>
            </Col>
          </Row>
          <CarTable cars={cars} handleCarRemoving={handleCarRemoving} />
        </Row>
      )}
    </Container>
  );
};
export default ManageCars;
