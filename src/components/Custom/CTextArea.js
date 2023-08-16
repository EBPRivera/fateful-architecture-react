import _ from "lodash";
import { Form } from "react-bootstrap";

import CInputErrors from "./CInputErrors";

const CTextArea = ({ onChange, value, label, errors = [] }) => {
  return (
    <Form.Group>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        as="textarea"
        rows={3}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {!_.isEmpty(errors) && <CInputErrors errors={errors} />}
    </Form.Group>
  );
};

export default CTextArea;
