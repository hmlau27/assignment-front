import React, { useEffect, useState } from "react";
import { bookCar, getAvailableCars } from "../../utils/ApiCalls";
import { Alert, Row } from "react-bootstrap";
import FilterCar from "./FilterCar";
import { DateTime } from "luxon";
import CarTable from "../common/CarTable";

const CarListing = () => {
  const [cars, setCars] = useState([]);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [filterDate, setFilterDate] = useState({
    startDate: "",
    endDate: "",
  });

  const fetchCars = async (startDate, endDate) => {
    setIsLoading(true);
    try {
      const response = await getAvailableCars(startDate, endDate);
      setCars(response);
    } catch (error) {
      setMessage(error.message);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    const tdy = DateTime.now();
    setFilterDate({
      startDate: tdy.toISODate().toString(),
      endDate: tdy.plus({ day: 1 }).toISODate().toString(),
    });
    fetchCars(tdy.toISODate(), tdy.plus({ month: 1 }).toISODate());
  }, []);

  const handleFilterInputChange = (e) => {
    const { name, value } = e.target;
    setFilterDate({
      ...filterDate,
      [name]: value,
    });
  };

  const handleFilterSubmit = async (e) => {
    e.preventDefault();
    if (filterDate.startDate < filterDate.endDate) {
      setMessage("");
      await fetchCars(filterDate.startDate, filterDate.endDate);
    } else {
      setMessage("Renting end date must comes after start date.");
    }
  };

  const handleCarRenting = async (email, carId) => {
    if (localStorage.getItem("accessToken") == null) {
      setMessage("Please login before proceed with booking.");
      return;
    }
    try {
      const response = await bookCar(
        email,
        carId,
        filterDate.startDate,
        filterDate.endDate
      );
      setMessage(response);
      setCars(cars.filter((car) => car.carId !== carId));
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {message && (
        <Alert
          variant={`${message.includes("successfully") ? "success" : "danger"}`}
        >
          {message}
        </Alert>
      )}
      {cars && (
        <>
          <FilterCar
            handleFilterInputChange={handleFilterInputChange}
            filterDate={filterDate}
            handleFilterSubmit={handleFilterSubmit}
          />

          <Row>
            <h3 className="mb-4">Available Cars</h3>
            <CarTable cars={cars} handleCarRenting={handleCarRenting} />
          </Row>
        </>
      )}
    </>
  );
};

export default CarListing;
