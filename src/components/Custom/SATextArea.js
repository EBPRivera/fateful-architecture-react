import { Form } from "react-bootstrap";

const SATextArea = ({ onChange, value, label }) => {
  return (
    <Form.Group>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        as="textarea"
        rows={3}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </Form.Group>
  );
};

export default SATextArea;
