import _ from "lodash";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

import CharacterStat from "../components/CharacterStat";
import SACard from "../components/SACard";

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

    const {
      name,
      description,
      physical,
      mental,
      social,
      awareness,
      prowess,
      resilience,
      stamina_limit,
    } = location.state.character;

    return (
      <>
        <Row>
          <Col as="h1">{name}</Col>
        </Row>
        <Row>
          <Col>{description}</Col>
        </Row>
        <Row className="character-stats">
          <Container>
            <Row>
              <Col>
                <SACard title="Stamina" className="stamina-limit">
                  <Container>
                    <Row>
                      <Col>
                        <CharacterStat title="Current" value={stamina_limit} />
                      </Col>
                      <Col>
                        <CharacterStat title="Max" value={stamina_limit} />
                      </Col>
                      <Col>
                        <CharacterStat title="Limit" value={stamina_limit} />
                      </Col>
                    </Row>
                  </Container>
                </SACard>
              </Col>
            </Row>
            <Row>
              <Col>
                <SACard title="Base Stats" className="base-stats">
                  <Container>
                    <Row>
                      <Col>
                        <CharacterStat title="Physical" value={physical} />
                      </Col>
                      <Col>
                        <CharacterStat title="Mental" value={mental} />
                      </Col>
                      <Col>
                        <CharacterStat title="Social" value={social} />
                      </Col>
                    </Row>
                  </Container>
                </SACard>
              </Col>
              <Col>
                <SACard
                  title="Complementary Stats"
                  className="complementary-stats"
                >
                  <Container>
                    <Row>
                      <Col>
                        <CharacterStat title="Awareness" value={awareness} />
                      </Col>
                      <Col>
                        <CharacterStat title="Prowess" value={prowess} />
                      </Col>
                      <Col>
                        <CharacterStat title="Resilience" value={resilience} />
                      </Col>
                    </Row>
                  </Container>
                </SACard>
              </Col>
            </Row>
          </Container>
        </Row>
      </>
    );
  };

  return <Container id="character-page">{renderDetails()}</Container>;
};

export default Character;
