import _ from "lodash";
import { Container, Row, Col, Form } from "react-bootstrap";

import SACard from "../Custom/SACard";
import { DIE_SIZES } from "../../globals";

const AttributeStatsForm = ({ stats, title, onChange }) => {
  const handleChange = (title, value) => {
    onChange(title, value);
  };

  const renderEditableForm = () => {
    return _.map(stats, (stat, key) => {
      const { title, value } = stat;
      const characterAttributes = _.without(DIE_SIZES, "d12");

      return (
        <Col key={key}>
          <h5>{title}</h5>
          <hr />
          <Form.Select
            defaultValue={value}
            onChange={(e) => {
              e.preventDefault();
              handleChange(_.camelCase(title), e.target.value);
            }}
          >
            {_.map(characterAttributes, (die, key) => (
              <option key={key} value={die}>
                {die}
              </option>
            ))}
          </Form.Select>
        </Col>
      );
    });
  };

  return (
    <SACard title={title}>
      <Container>
        <Row>{renderEditableForm()}</Row>
      </Container>
    </SACard>
  );
};

export default AttributeStatsForm;