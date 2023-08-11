import _ from "lodash";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Spinner,
} from "react-bootstrap";

import useAxiosInstance from "../hooks/useAxiosInstance";
import { login } from "../features/user";
import { INITIAL_ERROR } from "../globals";
import SATextInput from "../components/Custom/SATextInput";
import SAPasswordInput from "../components/Custom/SAPasswordInput";
import SAError from "../components/Custom/SAError";

const INITIAL_INPUT = {
  username: "",
  password: "",
  passwordConfirmation: "",
};

const INITIAL_FIELD_ERRORS = {
  username: [],
  password: [],
};

const Signup = () => {
  const [input, setInput] = useState(INITIAL_INPUT);
  const [loading, setLoading] = useState(false);
  const [generalErrors, setGeneralErrors] = useState(INITIAL_ERROR);
  const [fieldErrors, setFieldErrors] = useState(INITIAL_FIELD_ERRORS);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const axiosInstance = useAxiosInstance();

  const handleChangeInput = (key, value) => {
    setInput((input) => ({ ...input, [key]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, password, passwordConfirmation } = input;

    setLoading(true);

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
          setFieldErrors(
            _.mapKeys(e.response.data, (val, key) => _.camelCase(key))
          );
        } else {
          setGeneralErrors({ hasError: true, messages: [e.message] });
        }
      });

    setLoading(false);
  };

  const renderErrorMessages = () =>
    _.map(generalErrors.messages, (message, key) => (
      <Row key={key}>
        <Col>
          <SAError onClose={() => setGeneralErrors(INITIAL_ERROR)} dismissible>
            {message}
          </SAError>
        </Col>
      </Row>
    ));

  return (
    <div id="signup-page">
      <h1>Signup Page</h1>
      <Container>
        {generalErrors.hasError && renderErrorMessages()}
        <Row>
          <Col as={Card}>
            <Form onSubmit={handleSubmit}>
              <Container className="form-container">
                <Row className="mb-3">
                  <Col>
                    <SATextInput
                      label="Username"
                      onChange={(newValue) =>
                        handleChangeInput("username", newValue)
                      }
                      value={input.username}
                      errors={fieldErrors.username}
                    />
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col>
                    <SAPasswordInput
                      label="Password"
                      onChange={(newValue) =>
                        handleChangeInput("password", newValue)
                      }
                      value={input.password}
                      errors={fieldErrors.password}
                    />
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col>
                    <SAPasswordInput
                      label="Confirm Password"
                      onChange={(newValue) =>
                        handleChangeInput("passwordConfirmation", newValue)
                      }
                      value={input.passwordConfirmation}
                      errors={fieldErrors.passwordConfirmation}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Button type="submit">
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

export default Signup;
