import _ from "lodash";
import { useNavigate } from "react-router";
import { Nav, Navbar, Container, NavDropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import { logout, guestLogin } from "../features/user";
import { deleteGuestCharacter } from "../features/guestCharacter";
import useAuthorized from "../hooks/useAuthorized";
import useGuest from "../hooks/useGuest";

const NavigationBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const guestCharacter = useSelector((state) => state.guestCharacter);
  const isAuthorized = useAuthorized();
  const isGuest = useGuest();

  const handleNavigate = (e, state = {}) => {
    navigate(e.target.name, state);
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
    return (
      <Nav.Link name="/characters" onClick={handleNavigate}>
        Characters
      </Nav.Link>
    );
  };

  const renderGuestMenuItems = () => {
    const { character } = guestCharacter;

    if (_.isNull(character)) {
      return (
        <Nav.Link name="/characters/new" onClick={handleNavigate}>
          Create Character
        </Nav.Link>
      );
    } else {
      return (
        <Nav.Link
          name={`/characters/${_.kebabCase(character.name)}`}
          onClick={(e) => {
            handleNavigate(e, { state: { character } });
          }}
        >
          Your Character
        </Nav.Link>
      );
    }
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
            {isAuthorized && renderAuthMenuItems()}
            {isGuest && renderGuestMenuItems()}
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
