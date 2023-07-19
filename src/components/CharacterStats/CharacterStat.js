import { InputGroup, Form, Button } from "react-bootstrap";
import { BsDashLg, BsPlusLg } from "react-icons/bs";

const CharacterStat = ({ title, value, editable = false, onChange }) => {
  const renderEditableValue = () => (
    <InputGroup>
      <Button variant="danger" onClick={() => onChange(value - 1)}>
        <BsDashLg />
      </Button>
      <Form.Control
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value))}
      />
      <Button onClick={() => onChange(value + 1)}>
        <BsPlusLg />
      </Button>
    </InputGroup>
  );

  return (
    <div className="character-stat">
      <h5>{title}</h5>
      <hr />
      <div>{editable ? renderEditableValue() : <b>{value}</b>}</div>
    </div>
  );
};

export default CharacterStat;
