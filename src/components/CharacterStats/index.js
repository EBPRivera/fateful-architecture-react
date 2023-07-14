import { Container, Row, Col } from "react-bootstrap";

import StaminaStats from "./StaminaStats";
import AttributeStats from "./AttributeStats";

const CharacterStats = ({ character }) => {
  const {
    stamina_limit,
    physical,
    mental,
    social,
    awareness,
    prowess,
    resilience,
  } = character;
  const baseStats = [
    { title: "Physical", value: physical },
    { title: "Mental", value: mental },
    { title: "Social", value: social },
  ];
  const complementaryStats = [
    { title: "Awareness", value: awareness },
    { title: "Prowess", value: prowess },
    { title: "Resilience", value: resilience },
  ];

  return (
    <Container>
      <Row>
        <Col className="stamina-stats">
          <StaminaStats staminaLimit={stamina_limit} />
        </Col>
      </Row>
      <Row className="attribute-stats">
        <Col className="base-stats">
          <AttributeStats title="Base Stats" stats={baseStats} />
        </Col>
        <Col className="complementary-stats">
          <AttributeStats
            title="Complementary Stats"
            stats={complementaryStats}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default CharacterStats;
