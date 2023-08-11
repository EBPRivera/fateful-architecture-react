import _ from "lodash";
import { Form } from "react-bootstrap";

import SAInputErrors from "./SAInputErrors";

const SATextArea = ({ onChange, value, label, errors = [] }) => {
  return (
    <Form.Group>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        as="textarea"
        rows={3}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {!_.isEmpty(errors) && <SAInputErrors errors={errors} />}
    </Form.Group>
  );
};

export default SATextArea;
