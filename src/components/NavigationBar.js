import _ from "lodash";
import { useNavigate } from "react-router";
import { Nav, Navbar, Container } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";

import { logout } from "../features/user";

const { Link } = Nav;
const { Collapse } = Navbar;

const NavigationBar = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleNavigate = ({ target }) => {
    const { name } = target;
    navigate(name);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  const renderAuthLink = () => {
    if (_.isNull(user.id) || _.isNull(user.token)) {
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
          <Link name="/characters" onClick={handleNavigate}>
            Characters
          </Link>
        </Nav>
        <Collapse />
        <Nav>{renderAuthLink()}</Nav>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
