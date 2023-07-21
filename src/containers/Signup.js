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
  confirmPassword: "",
};

const Signup = () => {
  const [input, setInput] = useState(INITIAL_INPUT);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(INITIAL_ERROR);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const axiosInstance = useAxiosInstance();

  const handleChangeInput = (key, value) => {
    setInput((input) => ({ ...input, [key]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, password, confirmPassword } = input;

    setLoading(true);

    if (_.isEqual(password, confirmPassword)) {
      await axiosInstance
        .post("/users", { username, password })
        .then(({ data }) => {
          dispatch(login({ id: data.user.id, token: data.token }));
          navigate("/characters");
        })
        .catch((e) => setError({ hasError: true, message: e.message }));
    } else {
      setError({ hasError: true, message: "Please confirm your password" });
    }

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
    <div id="signup-page">
      <h1>Signup Page</h1>
      <Container>
        {error.hasError && renderErrorMessage()}
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
                    />
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col>
                    <SAPasswordInput
                      label="Confirm Password"
                      onChange={(newValue) =>
                        handleChangeInput("confirmPassword", newValue)
                      }
                      value={input.confirmPassword}
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
