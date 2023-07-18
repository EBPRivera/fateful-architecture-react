import _ from "lodash";
import { Form } from "react-bootstrap";

const SANumberInput = ({ onChange, value, label, min = null, max = null }) => {
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
    </Form.Group>
  );
};

export default SANumberInput;
