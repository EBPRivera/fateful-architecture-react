import _ from "lodash";
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

import useAxiosInstance from "../hooks/useAxiosInstance";
import { login } from "../features/user";
import { INITIAL_ERROR } from "../globals";
import SATextInput from "../components/Custom/SATextInput";
import SAPasswordInput from "../components/Custom/SAPasswordInput";
import SAError from "../components/Custom/SAError";

const Login = () => {
  const [userParams, setUserParams] = useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(INITIAL_ERROR);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const axiosInstance = useAxiosInstance();

  const updateParams = (key, value) => {
    setUserParams({ ...userParams, [key]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { username, password } = userParams;

    await axiosInstance
      .post("/login", { username, password })
      .then(({ data }) => {
        // save data to redux
        dispatch(login({ id: data.user.id, token: data.token }));
        navigate("/characters");
      })
      .catch((e) => {
        if (!_.isNull(e.response)) {
          const { response } = e;
          setError({ hasError: true, message: response.data.error });
        } else {
          setError({ hasError: true, message: e.message });
        }
      });

    setLoading(false);
  };

  const renderErrorMessage = () => (
    <Row>
      <Col>
        <SAError onClose={() => setError(INITIAL_ERROR)} dismissible>
          {error.message}
        </SAError>
      </Col>
    </Row>
  );

  return (
    <div id="login-page">
      <h1>Login Page</h1>
      <Container>
        {error.hasError && renderErrorMessage()}
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
