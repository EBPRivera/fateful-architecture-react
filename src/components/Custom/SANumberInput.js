import _ from "lodash";
import { Form } from "react-bootstrap";

import SAInputErrors from "./SAInputErrors";

const SANumberInput = ({
  onChange,
  value,
  label,
  min = null,
  max = null,
  errors = [],
}) => {
  return (
    <Form.Group>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        type="number"
        value={value}
        onChange={(e) => onChange(_.toInteger(e.target.value))}
        min={min}
        max={max}
      />
      {!_.isEmpty(errors) && <SAInputErrors errors={errors} />}
    </Form.Group>
  );
};

export default SANumberInput;
