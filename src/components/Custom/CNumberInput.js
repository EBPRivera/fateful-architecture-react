import _ from "lodash";
import { Form } from "react-bootstrap";

import CInputErrors from "./CInputErrors";

const CNumberInput = ({
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
      {!_.isEmpty(errors) && <CInputErrors errors={errors} />}
    </Form.Group>
  );
};

export default CNumberInput;
