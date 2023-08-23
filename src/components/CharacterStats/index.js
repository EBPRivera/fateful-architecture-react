import { Container, Row, Col } from "react-bootstrap";

import ConstitutionStats from "./ConstitutionStats";
import AttributeStats from "./AttributeStats";

const CharacterStats = ({ character, onChange }) => {
  const constitution = {
    stamina: character.stamina,
    endurance: character.endurance,
    limit: character.limit,
  };

  const baseStats = [
    { title: "Physical", value: character.physical },
    { title: "Mental", value: character.mental },
    { title: "Social", value: character.social },
  ];
  const complementaryStats = [
    { title: "Awareness", value: character.awareness },
    { title: "Prowess", value: character.prowess },
    { title: "Resilience", value: character.resilience },
  ];

  return (
    <Container>
      <Row>
        <Col className="constitution-stats-col">
          <ConstitutionStats stats={constitution} onChange={onChange} />
        </Col>
      </Row>
      <Row className="attribute-stats-col">
        <Col className="base-stats" lg={6}>
          <AttributeStats title="Base Stats" stats={baseStats} />
        </Col>
        <Col className="complementary-stats-col" lg={6}>
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
