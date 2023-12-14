import { Navbar, Nav, Container } from "react-bootstrap";
import { FaHouse, FaCircleUser } from "react-icons/fa6";
import { LinkContainer } from "react-router-bootstrap";
import logo from "../assets/Shark-Colours-Logo.png";

const MenuBar = () => {
  return (
    <header>
      <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>
              <img src={logo} alt="Shark Colours Design & Tech" style={{ width: "100px" }} />
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ms-auto">
              <LinkContainer to="/">
                <Nav.Link>
                  <FaHouse /> Home
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to="/admin">
                <Nav.Link>
                  <FaCircleUser /> Admin
                </Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default MenuBar;
