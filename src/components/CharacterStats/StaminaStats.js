import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";

import CharacterStat from "./CharacterStat";
import SACard from "../SACard";

const INITIAL_STAMINA = {
  current: 0,
  max: 0,
};

const StaminaStats = ({ staminaLimit }) => {
  const [stamina, setStamina] = useState(INITIAL_STAMINA);

  useEffect(() => {
    setStamina({ current: staminaLimit, max: staminaLimit });
  }, [staminaLimit]);

  return (
    <SACard title="Stamina">
      <Container>
        <Row>
          <Col>
            <CharacterStat
              title="Current"
              value={stamina.current}
              editable
              onChange={(value) => {
                setStamina((stamina) => ({
                  ...stamina,
                  current: value,
                }));
              }}
            />
          </Col>
          <Col>
            <CharacterStat
              title="Max"
              value={stamina.max}
              editable
              onChange={(value) =>
                setStamina((stamina) => ({
                  ...stamina,
                  max: value,
                }))
              }
            />
          </Col>
          <Col>
            <CharacterStat title="Limit" value={staminaLimit} />
          </Col>
        </Row>
      </Container>
    </SACard>
  );
};

export default StaminaStats;
