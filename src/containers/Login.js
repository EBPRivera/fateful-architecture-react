import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Card,
  Spinner,
} from "react-bootstrap";

import SATextInput from "../components/Custom/SATextInput";
import SAPasswordInput from "../components/Custom/SAPasswordInput";
import { login } from "../features/user";

const Login = () => {
  const [userParams, setUserParams] = useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const updateParams = (key, value) => {
    setUserParams({ ...userParams, [key]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { username, password } = userParams;

    await axios
      .post(`${process.env.REACT_APP_BASE_URL}login`, { username, password })
      .then(({ data }) => {
        // save data to redux
        dispatch(login({ id: data.user.id, token: data.token }));
        navigate("/characters");
      })
      .catch((e) => {
        navigate("/");
      });
  };

  return (
    <div id="login-page">
      <h1>Login Page</h1>
      <Container>
        <Row>
          <Col as={Card}>
            <Form onSubmit={handleLogin}>
              <Container className="form-container">
                <Row>
                  <Col>
                    <SATextInput
                      label="Username"
                      onChange={(newValue) => {
                        updateParams("username", newValue);
                      }}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <SAPasswordInput
                      label="Password"
                      onChange={(newValue) => {
                        updateParams("password", newValue);
                      }}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Button disabled={loading} type="submit">
                      {loading ? <Spinner as="span" size="sm" /> : "Submit"}
                    </Button>
                  </Col>
                </Row>
              </Container>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
