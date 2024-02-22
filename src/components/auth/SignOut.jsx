import { NavDropdown } from "react-bootstrap";

const SignOut = () => {
  return (
    <NavDropdown.Item href="/" onClick={localStorage.clear()}>
      Sign out
    </NavDropdown.Item>
  );
};
export default SignOut;
