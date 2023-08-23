import _ from "lodash";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { Container, Row, Col, Card } from "react-bootstrap";

import useAxiosInstance from "../hooks/useAxiosInstance";
import { login } from "../features/user";
import { responseErrors } from "../helpers/errors";
import AuthForm from "../components/Custom/AuthForm";
import CError from "../components/Custom/CError";

const Login = () => {
  const [input, setInput] = useState({
    username: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const axiosInstance = useAxiosInstance();

  const handleChangeInput = (key, value) => {
    setInput((input) => ({ ...input, [key]: value }));
  };

  const handleCloseErrorMessage = (message) => {
    setErrors((errors) =>
      _.remove(errors, (error) => _.isEqual(error, message))
    );
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const { username, password } = input;

    await axiosInstance
      .post("/login", { username, password })
      .then(({ data }) => {
        dispatch(login({ id: data.user.id, token: data.token }));
        navigate("/characters");
      })
      .catch((e) => {
        if (!_.isNull(e.response) && !_.isUndefined(e.response)) {
          setErrors(responseErrors(e.response.data, "base"));
        } else {
          setErrors([e.message]);
        }
      });

    setIsLoading(false);
  };

  const renderErrorMessages = () =>
    _.map(errors, (message, key) => (
      <Row key={key}>
        <Col>
          <CError onClose={() => handleCloseErrorMessage(message)} dismissible>
            {message}
          </CError>
        </Col>
      </Row>
    ));

  return (
    <Container id="login-page" className="pt-3">
      {!_.isEmpty(errors) && renderErrorMessages()}
      <Row md="3" className="justify-content-center">
        <Col as={Card} className="p-4">
          <Container>
            <Row>
              <h2>Login</h2>
            </Row>
            <Row>
              <AuthForm
                buttonText="Login"
                loading={isLoading}
                onChange={handleChangeInput}
                onSubmit={handleLogin}
              />
            </Row>
          </Container>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
