import _ from "lodash";
import { Container, Row, Col, Form } from "react-bootstrap";
import { BsChevronDoubleRight, BsChevronDoubleLeft } from "react-icons/bs";

import SACard from "../Custom/SACard";
import statProfiles from "../../json/statProfiles";
import stats from "../../json/stats";

const AttributeStatsForm = ({
  onChangeProfile,
  onChangeStatAllocation,
  profile,
  statAllocation,
  title,
  type,
}) => {
  const renderProfileDropdown = () => {
    return (
      <>
        <Col>
          <h5>Stat Profile</h5>
        </Col>
        <Col>
          <BsChevronDoubleRight />
        </Col>
        <Col>
          <Form.Select
            onChange={(e) => onChangeProfile(type, e.target.value)}
            value={profile}
          >
            {_.map(_.keys(statProfiles), (value, key) => {
              return <option key={key}>{value}</option>;
            })}
          </Form.Select>
        </Col>
      </>
    );
  };

  const renderStatsDropdown = () => {
    return _.map(statProfiles[profile], (value, key) => {
      return (
        <Row key={key} className="mb-2">
          <Col>{value}</Col>
          <Col>
            <BsChevronDoubleLeft />
          </Col>
          <Col>
            <Form.Select
              onChange={(e) =>
                onChangeStatAllocation(type, key, e.target.value)
              }
              value={statAllocation[key]}
            >
              {_.map(stats[type], (stat, key) => {
                return <option key={key}>{stat}</option>;
              })}
            </Form.Select>
          </Col>
        </Row>
      );
    });
  };

  return (
    <SACard title={title}>
      <Container>
        <Row className="mb-3">{renderProfileDropdown()}</Row>
        <hr />
        <Row>
          <Container>{renderStatsDropdown()}</Container>
        </Row>
      </Container>
    </SACard>
  );
};

export default AttributeStatsForm;
