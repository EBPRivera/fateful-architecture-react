import { Container, Row, Col } from "react-bootstrap";

import CharacterStat from "./CharacterStat";
import CCard from "../Custom/CCard";

const ConstitutionStats = ({ stats, onChange }) => {
  return (
    <CCard title="Constitution">
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
    </CCard>
  );
};

export default ConstitutionStats;
