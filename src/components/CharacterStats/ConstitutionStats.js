import { Container, Row, Col } from "react-bootstrap";

import CharacterStat from "./CharacterStat";
import CCard from "../Custom/CCard";

const ConstitutionStats = ({ stats, onChange }) => {
  const handleChangeStamina = (value) => {
    if (value <= stats.endurance && value > 0) {
      onChange({ ...stats, stamina: value });
    }
  };

  const handleChangeEndurance = (value) => {
    if (value <= stats.limit && value > 0) {
      const stamina = stats.stamina > value ? value : stats.stamina;
      onChange({ ...stats, stamina, endurance: value });
    }
  };

  return (
    <CCard title="Constitution">
      <Container>
        <Row>
          <Col>
            <CharacterStat
              title="Stamina"
              value={stats.stamina}
              editable
              onChange={handleChangeStamina}
            />
          </Col>
          <Col>
            <CharacterStat
              title="Endurance"
              value={stats.endurance}
              editable
              onChange={handleChangeEndurance}
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
