import { Container, Col, Row } from "react-bootstrap";

import CPageHeader from "../components/Custom/CPageHeader";
import CCard from "../components/Custom/CCard";

const Skills = () => {
  return (
    <>
      <CPageHeader>
        <h2>Skills</h2>
      </CPageHeader>
      <Container id="skills-page" className="pt-3">
        <Row>
          <Col as={CCard}>
            <h3>Feature incoming</h3>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Skills;
