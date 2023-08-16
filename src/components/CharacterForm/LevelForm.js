import { Container, Row, Col, Form } from "react-bootstrap";
import { BsChevronDoubleRight } from "react-icons/bs";

import CCard from "../Custom/CCard";

const LevelForm = ({ title, onChange, level, limit }) => {
  return (
    <div className="level-form">
      <CCard title={title}>
        <Container>
          <Row>
            <Col>
              <h5>Level</h5>
              <hr />
              <Form.Control
                type="number"
                value={level}
                onChange={(e) => onChange(e.target.value)}
                min={1}
                max={7}
              />
            </Col>
            <Col className="arrow">
              <BsChevronDoubleRight />
            </Col>
            <Col>
              <h5>Limit</h5>
              <hr />
              <b>{limit}</b>
            </Col>
          </Row>
        </Container>
      </CCard>
    </div>
  );
};

export default LevelForm;
