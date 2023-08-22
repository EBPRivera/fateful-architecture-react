import { Container, Row, Col } from "react-bootstrap";

import ConstitutionStat from "./ConstitutionStat";
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
    <CCard className="constitution-stats" title="Constitution">
      <Container>
        <Row>
          <Col sm={12} md={4}>
            <ConstitutionStat
              maxValue={stats.endurance}
              onChange={handleChangeStamina}
              title="Stamina"
              value={stats.stamina}
            />
          </Col>
          <Col sm={12} md={4}>
            <ConstitutionStat
              maxValue={stats.limit}
              onChange={handleChangeEndurance}
              title="Endurance"
              value={stats.endurance}
            />
          </Col>
          <Col sm={12} md={4}>
            <CharacterStat title="Limit" value={stats.limit} />
          </Col>
        </Row>
      </Container>
    </CCard>
  );
};

export default ConstitutionStats;
