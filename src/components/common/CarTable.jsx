import { Button, Table } from "react-bootstrap";

const CarTable = ({ cars, handleCarRenting, handleCarRemoving }) => {
  return (
    <Table bordered hover responsive>
      <thead>
        <tr>
          <th>Car ID</th>
          <th>Car Brand</th>
          <th>Car Model</th>
          <th>Car Type</th>
          <th style={{ whiteSpace: "nowrap", width: "1%" }} />
        </tr>
      </thead>
      <tbody>
        {cars.map((car) => (
          <tr key={car.carId}>
            <td>{car.carId}</td>
            <td>{car.carBrand}</td>
            <td>{car.carModel}</td>
            <td>{car.carType}</td>
            <td style={{ whiteSpace: "nowrap", width: "1%" }}>
              <Button
                size="sm"
                variant={
                  handleCarRemoving ? "outline-danger" : "outline-primary"
                }
                onClick={() =>
                  handleCarRemoving
                    ? handleCarRemoving(car.carId)
                    : handleCarRenting(
                        window.localStorage.getItem("email"),
                        car.carId
                      )
                }
              >
                {handleCarRemoving ? "Remove" : "Book"} Car
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};
export default CarTable;
