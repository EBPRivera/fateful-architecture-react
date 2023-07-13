import { useNavigate } from "react-router";
import { Nav, Navbar, Container } from "react-bootstrap";
import { useDispatch } from "react-redux";

import { logout } from "../features/user";
import useAuthorized from "../hooks/useAuthorized";

const { Link } = Nav;
const { Collapse } = Navbar;

const NavigationBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthorized = useAuthorized();

  const handleNavigate = ({ target }) => {
    const { name } = target;
    navigate(name);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const renderAuthMenuItems = () => {
    if (!isAuthorized) return;

    return (
      <>
        <Link name="/characters" onClick={handleNavigate}>
          Characters
        </Link>
      </>
    );
  };

  const renderAuthLink = () => {
    if (!isAuthorized) {
      return (
        <Link name="/login" onClick={handleNavigate}>
          Login
        </Link>
      );
    } else {
      return <Link onClick={handleLogout}>Logout</Link>;
    }
  };

  return (
    <Navbar expand="lg" className="bg-body-secondary">
      <Container>
        <Nav>
          <Link name="/" onClick={handleNavigate}>
            Home
          </Link>
          {renderAuthMenuItems()}
        </Nav>
        <Collapse />
        <Nav>{renderAuthLink()}</Nav>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
