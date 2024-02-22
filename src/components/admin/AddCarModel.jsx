import { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { addCar } from "../../utils/ApiCalls";

const AddCarModel = ({ showModal, handleClose, setMessage, fetchCars }) => {
  const [carDetails, setCarDetails] = useState({
    carBrand: "",
    carModel: "",
    carType: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setCarDetails({
      ...carDetails,
      [name]: value,
    });
  };

  const handleAddCarSubmit = async () => {
    try {
      const response = await addCar(carDetails);
      setMessage(response);
      await fetchCars();
      setCarDetails({
        carBrand: "",
        carModel: "",
        carType: "",
      });
      handleClose();
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add New Car</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleAddCarSubmit}>
          <Form.Group className="mb-3" controlId="carBrand">
            <Form.Label>Car Brand</Form.Label>
            <Form.Control
              type="text"
              required
              placeholder="e.g.: Perodua"
              value={carDetails.carBrand}
              name="carBrand"
              onChange={(e) => handleInputChange(e)}
              autoFocus
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="carModel">
            <Form.Label>Car Model</Form.Label>
            <Form.Control
              type="text"
              required
              placeholder="e.g.: Myvi"
              value={carDetails.carModel}
              name="carModel"
              onChange={(e) => handleInputChange(e)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="carType">
            <Form.Label>Car Type</Form.Label>
            <Form.Control
              type="text"
              required
              placeholder="e.g.: Sedan"
              value={carDetails.carType}
              name="carType"
              onChange={(e) => handleInputChange(e)}
            />
          </Form.Group>
          <div className="d-flex justify-content-end gap-2">
            <Button variant="secondary" type="button" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </div>
        </Form>
      </Modal.Body>
      <Modal.Footer></Modal.Footer>
    </Modal>
  );
};
export default AddCarModel;
