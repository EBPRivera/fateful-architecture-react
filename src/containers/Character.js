import _ from "lodash";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";

import CharacterStats from "../components/CharacterStats";
import CharacterSkills from "../components/CharacterSkills";
import SACard from "../components/Custom/SACard";
import SAPageHeader from "../components/Custom/SAPageHeader";

const Character = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (_.isNull(location.state) || _.isNull(location.state.character)) {
      navigate("/characters");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderDescription = (description) => {
    const paragraphs = _.split(description, "\n");

    return (
      <Row className="character-heading">
        <Col>
          <SACard>
            {_.map(paragraphs, (paragraph, key) => (
              <p key={key}>{paragraph}</p>
            ))}
          </SACard>
        </Col>
      </Row>
    );
  };

  const renderHeader = () => {
    if (_.isNull(location.state)) return;
    const { name } = location.state.character;
    const characterEditPath = `/characters/${_.kebabCase(name)}/edit`;

    return (
      <>
        <h2>{name}</h2>
        <Button
          className="ms-3"
          variant="outline-success"
          size="sm"
          onClick={() =>
            navigate(characterEditPath, {
              state: {
                character: location.state.character,
                from: location.pathname,
              },
            })
          }
        >
          Edit
        </Button>
      </>
    );
  };

  const renderDetails = () => {
    if (_.isNull(location.state)) return;

    const { description } = location.state.character;

    return (
      <>
        {!_.isEmpty(description) && renderDescription(description)}
        <Row className="character-stats">
          <CharacterStats character={location.state.character} />
        </Row>
        <Row className="character-skills">
          <CharacterSkills />
        </Row>
      </>
    );
  };

  return (
    <>
      <SAPageHeader>{renderHeader()}</SAPageHeader>
      <Container id="character-page" className="pt-3">
        {renderDetails()}
      </Container>
    </>
  );
};

export default Character;
