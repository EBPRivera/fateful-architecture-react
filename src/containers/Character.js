import _ from "lodash";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

import CharacterStats from "../components/CharacterStats";
import CharacterSkills from "../components/CharacterSkills";

const Character = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (_.isNull(location.state) || _.isNull(location.state.character)) {
      navigate("/characters");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderDetails = () => {
    if (_.isNull(location.state)) return;

    const { name, description } = location.state.character;

    return (
      <>
        <Row className="character-name">
          <Col as="h1">{name}</Col>
        </Row>
        <Row className="character-description">
          <Col>{description}</Col>
        </Row>
        <Row className="character-stats">
          <CharacterStats character={location.state.character} />
        </Row>
        <Row className="character-skills">
          <CharacterSkills />
        </Row>
      </>
    );
  };

  return <Container id="character-page">{renderDetails()}</Container>;
};

export default Character;
