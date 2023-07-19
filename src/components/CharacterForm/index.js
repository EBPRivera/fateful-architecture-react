import { useState } from "react";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Spinner,
  Card,
} from "react-bootstrap";

import SATextInput from "../Custom/SATextInput";
import SATextArea from "../Custom/SATextArea";
import AttributeStatsForm from "./AttributeStatsForm";
import LevelForm from "./LevelForm";

const INIT_ENTRIES = {
  name: "",
  level: 1,
  description: "",
  physical: "d6",
  mental: "d6",
  social: "d6",
  awareness: "d6",
  prowess: "d6",
  resilience: "d6",
};

const CharacterForm = ({
  handleSubmit,
  submitting,
  defaultCharacter = INIT_ENTRIES,
}) => {
  const [input, setInput] = useState(defaultCharacter);
  const [stamina, setStamina] = useState(20);

  const { physical, mental, social, awareness, prowess, resilience } = input;

  const submitForm = (event) => {
    event.preventDefault();
    handleSubmit({
      ...input,
      stamina_limit: stamina,
      stamina_current: stamina,
      stamina_max: stamina,
    });
  };

  const handleChangeInput = (key, value) => {
    setInput((input) => ({ ...input, [key]: value }));
  };

  return (
    <Container className="character-form">
      <Row>
        <Col as={Card}>
          <Form onSubmit={submitForm}>
            <Container>
              <Row>
                <SATextInput
                  label="Name"
                  value={input.name}
                  onChange={(newValue) => handleChangeInput("name", newValue)}
                />
              </Row>
              <Row>
                <SATextArea
                  label="Description"
                  value={input.description}
                  onChange={(newValue) =>
                    handleChangeInput("description", newValue)
                  }
                />
              </Row>
              <hr />
              <Row>
                <Col>
                  <LevelForm
                    title="Level and Stamina"
                    onChange={(newValue) => {
                      handleChangeInput("level", newValue);
                      setStamina(20 + (newValue - 1) * 5);
                    }}
                    level={input.level}
                    stamina={stamina}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <AttributeStatsForm
                    stats={[
                      { title: "Physical", value: physical },
                      { title: "Mental", value: mental },
                      { title: "Social", value: social },
                    ]}
                    title="Base Stats"
                    onChange={handleChangeInput}
                  />
                </Col>
                <Col>
                  <AttributeStatsForm
                    stats={[
                      { title: "Awareness", value: awareness },
                      { title: "Prowess", value: prowess },
                      { title: "Resilience", value: resilience },
                    ]}
                    title="Complementary Stats"
                    onChange={handleChangeInput}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <Button type="submit" disabled={submitting}>
                    {submitting ? <Spinner as="span" size="sm" /> : "Submit"}
                  </Button>
                </Col>
              </Row>
            </Container>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default CharacterForm;
