import _ from "lodash";
import { Form } from "react-bootstrap";

import InputErrors from "./SAInputErrors";

const SATextInput = ({ onChange, value, label, errors = [] }) => {
  return (
    <Form.Group>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {!_.isEmpty(errors) && <InputErrors errors={errors} />}
    </Form.Group>
  );
};

export default SATextInput;
