import { Form } from "react-bootstrap";

const SAPasswordInput = ({ onChange, value, label }) => {
  return (
    <Form.Group>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        type="password"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </Form.Group>
  );
};

export default SAPasswordInput;
