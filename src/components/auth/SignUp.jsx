import { useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  InputGroup,
  FloatingLabel,
  Alert,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { registerUser } from "../../utils/ApiCalls";

const SignUp = () => {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState("");

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();

    if (user.password !== user.confirmPassword) {
      setMessage("Password must be same with confirm password.");
    }

    try {
      const response = await registerUser(user);
      if (response.includes("success")) {
        setUser({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
      }
      setMessage(response);
    } catch (error) {
      setMessage(response.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center align-items-center">
        <Col md={6}>
          <h2>Register an Account</h2>
          {message && (
            <Alert
              variant={`${
                message.includes("successfully") ? "success" : "danger"
              }`}
            >
              {message}
            </Alert>
          )}
          <Form onSubmit={handleSignUpSubmit}>
            <Row className="justify-content-center align-items-center my-3">
              <Col md={6}>
                <FloatingLabel label="First Name" className="mb-3 mb-md-2">
                  <Form.Control
                    type="text"
                    required
                    placeholder="e.g. : John"
                    id="firstName"
                    name="firstName"
                    value={user.firstName}
                    onChange={(e) => handleInputChange(e)}
                  />
                </FloatingLabel>
                <Form.Control.Feedback type="invalid">
                  First name must be entered.
                </Form.Control.Feedback>
              </Col>
              <Col md={6}>
                <FloatingLabel label="Last Name" className="mb-2">
                  <Form.Control
                    type="text"
                    placeholder="e.g. : Smith"
                    id="lastName"
                    name="lastName"
                    value={user.lastName}
                    onChange={(e) => handleInputChange(e)}
                  />
                </FloatingLabel>
              </Col>
            </Row>

            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">Email</InputGroup.Text>
              <Form.Control
                type="email"
                id="email"
                name="email"
                placeholder="e.g. : xxxx@example.com"
                aria-label="email"
                aria-describedby="basic-addon2"
                value={user.email}
                onChange={(e) => handleInputChange(e)}
              />
            </InputGroup>
            <Form.Control.Feedback type="invalid">
              Please enter a valid email.
            </Form.Control.Feedback>

            <FloatingLabel label="Password" className="mb-3">
              <Form.Control
                type="password"
                placeholder=""
                id="password"
                name="password"
                value={user.password}
                onChange={(e) => handleInputChange(e)}
              />
            </FloatingLabel>
            <Form.Control.Feedback type="invalid">
              Password must be same with confirm password.
            </Form.Control.Feedback>

            <FloatingLabel label="Confirm Password" className="mb-3">
              <Form.Control
                type="password"
                placeholder=""
                id="confirmPassword"
                name="confirmPassword"
                value={user.confirmPassword}
                onChange={(e) => handleInputChange(e)}
              />
            </FloatingLabel>
            <Form.Control.Feedback type="invalid">
              Password must be same with confirm password.
            </Form.Control.Feedback>

            <button type="submit" className="btn btn-outline-primary me-2">
              Sign Up
            </button>
            <Link to={"/auth/sign-in"}>Already have an account?</Link>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};
export default SignUp;
