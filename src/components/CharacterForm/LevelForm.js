import { Container, Row, Col, Form } from "react-bootstrap";
import { BsChevronDoubleRight } from "react-icons/bs";

import SACard from "../Custom/SACard";

const LevelForm = ({ title, onChange, level, stamina }) => {
  return (
    <div className="level-form">
      <SACard title={title}>
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
              <h5>Stamina</h5>
              <hr />
              <b>{stamina}</b>
            </Col>
          </Row>
        </Container>
      </SACard>
    </div>
  );
};

export default LevelForm;
