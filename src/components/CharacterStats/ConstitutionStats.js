import { Container, Row, Col } from "react-bootstrap";

import CharacterStat from "./CharacterStat";
import SACard from "../Custom/SACard";

const ConstitutionStats = ({ stats, onChange }) => {
  return (
    <SACard title="Constitution">
      <Container>
        <Row>
          <Col>
            <CharacterStat
              title="Stamina"
              value={stats.stamina}
              editable
              onChange={(value) => {
                onChange({
                  ...stats,
                  stamina: value,
                });
              }}
            />
          </Col>
          <Col>
            <CharacterStat
              title="Endurance"
              value={stats.endurance}
              editable
              onChange={(value) =>
                onChange({
                  ...stats,
                  endurance: value,
                })
              }
            />
          </Col>
          <Col>
            <CharacterStat title="Limit" value={stats.limit} />
          </Col>
        </Row>
      </Container>
    </SACard>
  );
};

export default ConstitutionStats;
