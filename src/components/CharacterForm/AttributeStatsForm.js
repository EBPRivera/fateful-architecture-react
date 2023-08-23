import _ from "lodash";
import { Container, Row, Col, Form } from "react-bootstrap";

import CCard from "../Custom/CCard";
import dieSizes from "../../json/dieSizes";

const AttributeStatsForm = ({ stats, title, onChange }) => {
  const handleChange = (title, value) => {
    onChange(title, value);
  };

  const renderEditableForm = () => {
    return _.map(stats, (stat, key) => {
      const { title, value } = stat;
      const characterAttributes = _.without(dieSizes, "d12");

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
    <CCard title={title}>
      <Container>
        <Row>{renderEditableForm()}</Row>
      </Container>
    </CCard>
  );
};

export default AttributeStatsForm;
