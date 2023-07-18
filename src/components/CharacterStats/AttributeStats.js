import _ from "lodash";
import { Container, Row, Col } from "react-bootstrap";

import SACard from "../Custom/SACard";
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
    <SACard title={title}>
      <Container>
        <Row>{renderStatsCollection()}</Row>
      </Container>
    </SACard>
  );
};

export default AttributeStats;
