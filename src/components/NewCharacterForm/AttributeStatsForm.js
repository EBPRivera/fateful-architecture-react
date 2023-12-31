import _ from "lodash";
import { Container, Row, Col, Form } from "react-bootstrap";
import { BsChevronDoubleRight, BsChevronDoubleLeft } from "react-icons/bs";

import CCard from "../Custom/CCard";
import Die from "../Custom/Die";
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
        <Col xs={4} md={4}>
          <h5>Stat Profile</h5>
        </Col>
        <Col xs={2} md={3}>
          <BsChevronDoubleRight />
        </Col>
        <Col xs={6} md={5}>
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
        <Row key={key} className="mb-2 align-items-center">
          <Col className="d-flex justify-content-center" xs={3} md={4}>
            <Die size={value} />
          </Col>
          <Col xs={2} md={3}>
            <BsChevronDoubleLeft />
          </Col>
          <Col xs={7} md={5}>
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
    <CCard title={title}>
      <Container>
        <Row className="mb-3 align-items-center">{renderProfileDropdown()}</Row>
        <hr />
        <Row>
          <Container>{renderStatsDropdown()}</Container>
        </Row>
      </Container>
    </CCard>
  );
};

export default AttributeStatsForm;
