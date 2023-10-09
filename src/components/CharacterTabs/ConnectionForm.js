import classNames from "classnames";
import { useState } from "react";
import { Button, Container, Row, Form, InputGroup } from "react-bootstrap";

import CTextInput from "../Custom/CTextInput";
import CTextArea from "../Custom/CTextArea";

const INIT_CONNECTION = {
  name: "",
  description: "",
};

const ConnectionForm = ({
  className,
  defaultValue = INIT_CONNECTION,
  onSubmit,
  editing,
}) => {
  const [connection, setConnection] = useState(defaultValue);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(connection);
  };

  const handleChange = (value, field) => {
    setConnection((connection) => ({
      ...connection,
      [field]: value,
    }));
  };

  return (
    <Form className={classNames(className)} onSubmit={handleSubmit}>
      <Container className="p-0">
        <Row className="mb-2">
          <InputGroup>
            <CTextInput
              onChange={(value) => handleChange(value, "name")}
              value={connection.name}
            />
            <Button type="submit" variant={editing ? "success" : "primary"}>
              {editing ? "Edit" : "Add"}
            </Button>
          </InputGroup>
        </Row>
        <Row>
          <CTextArea
            label="Description"
            onChange={(value) => handleChange(value, "description")}
            value={connection.description}
          />
        </Row>
      </Container>
    </Form>
  );
};

export default ConnectionForm;
