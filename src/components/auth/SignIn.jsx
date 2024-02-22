import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Form,
  InputGroup,
  FloatingLabel,
  Alert,
} from "react-bootstrap";
import { loginUser } from "../../utils/ApiCalls";

const SignIn = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const [message, setMessage] = useState("");

  const handleSignInSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await loginUser(user);
      localStorage.setItem("accessToken", response.accessToken);
      localStorage.setItem("email", response.email);
      localStorage.setItem("role", response.role);
      navigate("/", { state: { message: "success" } });
      window.location.reload();
    } catch (error) {
      setMessage(error.message);
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
      {message && <Alert variant={"danger"}>{message}</Alert>}

      <Row className="justify-content-center align-items-center">
        <Col md={6}>
          <h2>Sign In</h2>
          <Form onSubmit={handleSignInSubmit}>
            <InputGroup className="my-4">
              <InputGroup.Text id="basic-addon1">Email</InputGroup.Text>
              <Form.Control
                type="email"
                id="email"
                name="email"
                placeholder="Enter your registered email address"
                aria-label="email"
                aria-describedby="basic-addon2"
                value={user.email}
                onChange={(e) => handleInputChange(e)}
                required
              />
            </InputGroup>

            <FloatingLabel label="Password" className="mb-3">
              <Form.Control
                type="password"
                placeholder=""
                id="password"
                required
                name="password"
                value={user.password}
                onChange={(e) => handleInputChange(e)}
              />
            </FloatingLabel>

            <button type="submit" className="btn btn-outline-primary me-2">
              Sign In
            </button>
            <Link to={"/auth/sign-up"}>Don't have an account yet?</Link>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};
export default SignIn;
