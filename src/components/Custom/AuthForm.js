import { Form, Container, Row, Col, Button, Spinner } from "react-bootstrap";

import SATextInput from "./SATextInput";
import SAPasswordInput from "./SAPasswordInput";

const DEFAULT_ERRORS = {
  passwordConfirmation: [],
  username: [],
  password: [],
};

const AuthForm = ({
  buttonText,
  errors = DEFAULT_ERRORS,
  hasPasswordConfirmation = false,
  loading,
  onChange,
  onSubmit,
}) => {
  const renderPasswordConfirmation = () => {
    return (
      <Row>
        <Col className="px-0">
          <SAPasswordInput
            errors={errors.passwordConfirmation}
            label="Confirm Password"
            onChange={(newValue) => onChange("passwordConfirmation", newValue)}
          />
        </Col>
      </Row>
    );
  };

  return (
    <Form onSubmit={onSubmit} className="auth-form">
      <Container className="form-container">
        <Row>
          <Col className="px-0">
            <SATextInput
              errors={errors.username}
              label="Username"
              onChange={(newValue) => {
                onChange("username", newValue);
              }}
            />
          </Col>
        </Row>
        <Row>
          <Col className="px-0">
            <SAPasswordInput
              errors={errors.password}
              label="Password"
              onChange={(newValue) => {
                onChange("password", newValue);
              }}
            />
          </Col>
        </Row>
        {hasPasswordConfirmation && renderPasswordConfirmation()}
        <Row className="mt-4">
          <Button disabled={loading} type="submit">
            {loading ? <Spinner as="span" size="sm" /> : buttonText}
          </Button>
        </Row>
      </Container>
    </Form>
  );
};

export default AuthForm;
