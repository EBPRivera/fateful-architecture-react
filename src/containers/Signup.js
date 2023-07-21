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
import SATextInput from "../components/Custom/SATextInput";
import SAPasswordInput from "../components/Custom/SAPasswordInput";

const INITIAL_INPUT = {
  username: "",
  password: "",
  confirmPassword: "",
};

const Signup = () => {
  const [input, setInput] = useState(INITIAL_INPUT);
  const [loading, setLoading] = useState(false);
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
        .catch((e) => console.log(e.message));
    }

    setLoading(false);
  };

  return (
    <div id="signup-page">
      <h1>Signup Page</h1>
      <Container>
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
