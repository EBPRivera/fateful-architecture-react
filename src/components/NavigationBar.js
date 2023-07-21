import { useNavigate } from "react-router";
import { Nav, Navbar, Container, NavDropdown } from "react-bootstrap";
import { useDispatch } from "react-redux";

import { logout, guestLogin } from "../features/user";
import { deleteGuestCharacter } from "../features/guestCharacter";
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
    dispatch(deleteGuestCharacter());
    navigate("/");
  };

  const handleLoginAsGuest = () => {
    dispatch(guestLogin());
    navigate("/characters/new");
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
        <>
          <Nav.Link name="/signup" onClick={handleNavigate}>
            Signup
          </Nav.Link>
          <NavDropdown title="Login">
            <NavDropdown.Item name="/login" onClick={handleNavigate}>
              As User
            </NavDropdown.Item>
            <NavDropdown.Item onClick={handleLoginAsGuest}>
              As Guest
            </NavDropdown.Item>
          </NavDropdown>
        </>
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
            <Nav.Link name="/skills" onClick={handleNavigate}>
              Skills
            </Nav.Link>
          </Nav>
          <Navbar.Collapse />
          <Nav>{renderAuthLink()}</Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
