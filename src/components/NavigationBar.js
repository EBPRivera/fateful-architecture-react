import { useNavigate } from "react-router";
import { Nav, Navbar, Container, NavDropdown } from "react-bootstrap";
import { useDispatch } from "react-redux";

import { logout, guestLogin } from "../features/user";
import useAuthorized from "../hooks/useAuthorized";
import useGuest from "../hooks/useGuest";

const NavigationBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthorized = useAuthorized();
  const isGuest = useGuest();

  const handleNavigate = ({ target }) => {
    const { name } = target;
    navigate(name);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const handleLoginAsGuest = () => {
    dispatch(guestLogin());
  };

  const renderAuthMenuItems = () => {
    if (!isAuthorized && !isGuest) return;

    return (
      <Nav.Link name="/characters" onClick={handleNavigate}>
        Characters
      </Nav.Link>
    );
  };

  const renderAuthLink = () => {
    if (!isAuthorized && !isGuest) {
      return (
        <NavDropdown title="Login">
          <NavDropdown.Item name="/login" onClick={handleNavigate}>
            As User
          </NavDropdown.Item>
          <NavDropdown.Item onClick={handleLoginAsGuest}>
            As Guest
          </NavDropdown.Item>
        </NavDropdown>
      );
    } else {
      return <Nav.Link onClick={handleLogout}>Logout</Nav.Link>;
    }
  };

  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-secondary">
      <Container>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav>
            <Nav.Link name="/" onClick={handleNavigate}>
              Home
            </Nav.Link>
            {renderAuthMenuItems()}
          </Nav>
          <Navbar.Collapse />
          <Nav>{renderAuthLink()}</Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
