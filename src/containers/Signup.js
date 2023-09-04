import _ from "lodash";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Container, Row, Col, Card } from "react-bootstrap";

import useAxiosInstance from "../hooks/useAxiosInstance";
import { login } from "../features/user";
import AuthForm from "../components/Custom/AuthForm";
import CError from "../components/Custom/CError";

const INITIAL_INPUT = {
  username: "",
  password: "",
  passwordConfirmation: "",
};

const INITIAL_SIGNUP_ERRORS = {
  field: {
    username: [],
    password: [],
    passwordConfirmation: [],
  },
  general: [],
};

const Signup = () => {
  const [input, setInput] = useState(INITIAL_INPUT);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState(INITIAL_SIGNUP_ERRORS);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const axiosInstance = useAxiosInstance();

  const handleChangeInput = (key, value) => {
    setInput((input) => ({ ...input, [key]: value }));
  };

  const handleCloseErrorMessage = (message) => {
    setErrors((errors) => ({
      ...errors,
      general: _.remove(errors.general, (error) => _.isEqual(error, message)),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, password, passwordConfirmation } = input;

    setIsLoading(true);

    await axiosInstance
      .post("/users", {
        username,
        password,
        password_confirmation: passwordConfirmation,
      })
      .then(({ data }) => {
        dispatch(login({ id: data.user.id, token: data.token }));
        navigate("/characters");
      })
      .catch((e) => {
        if (!_.isNull(e.response) && !_.isUndefined(e.response)) {
          setErrors((errors) => ({
            ...errors,
            field: _.mapKeys(e.response.data, (val, key) => _.camelCase(key)),
          }));
        } else {
          setErrors((errors) => ({
            ...errors,
            general: [
              "API Temporarily unavailable. Please login as guest instead",
            ],
          }));
        }
      });

    setIsLoading(false);
  };

  const renderErrorMessages = () =>
    _.map(errors.general, (message, key) => (
      <Row key={key}>
        <Col>
          <CError onClose={() => handleCloseErrorMessage(message)} dismissible>
            {message}
          </CError>
        </Col>
      </Row>
    ));

  return (
    <Container id="signup-page" className="pt-3">
      {!_.isEmpty(errors.general) && renderErrorMessages()}
      <Row md="3" className="justify-content-center">
        <Col as={Card} className="p-4">
          <Container>
            <Row>
              <h2>Sign Up</h2>
            </Row>
            <Row>
              <AuthForm
                buttonText="Sign Up"
                errors={errors.field}
                loading={isLoading}
                onChange={handleChangeInput}
                onSubmit={handleSubmit}
                hasPasswordConfirmation
              />
            </Row>
          </Container>
        </Col>
      </Row>
    </Container>
  );
};

export default Signup;
