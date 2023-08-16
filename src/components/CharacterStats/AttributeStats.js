import _ from "lodash";
import { Container, Row, Col } from "react-bootstrap";

import CCard from "../Custom/CCard";
import CharacterStat from "./CharacterStat";

const AttributeStats = ({ stats, title }) => {
  const renderStatsCollection = () => {
    return _.map(stats, (stat, key) => {
      const { title, value } = stat;

      return (
        <Col key={key}>
          <CharacterStat title={title} value={value} />
        </Col>
      );
    });
  };

  return (
    <CCard title={title}>
      <Container>
        <Row>{renderStatsCollection()}</Row>
      </Container>
    </CCard>
  );
};

export default AttributeStats;
