import { Container, Nav, Navbar as NavbarBS } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <NavbarBS sticky="top" className="bg-white shadow-sm mb-3">
      <Container>
        <Nav className="me-auto">
          <Nav.Link to="/" as={NavLink}>
            Orders
          </Nav.Link>
          <Nav.Link to="/completedorders" as={NavLink}>
            Completed Orders
          </Nav.Link>
          <Nav.Link to="/deletedorders" as={NavLink}>
            Deleted Orders
          </Nav.Link>
        </Nav>
      </Container>
    </NavbarBS>
  );
};

export default NavBar;
