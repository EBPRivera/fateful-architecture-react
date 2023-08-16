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

import { responseErrors } from "../../helpers/errors";
import { removeEmptyParagraphs } from "../../helpers/input";
import CTextInput from "../Custom/CTextInput";
import CTextArea from "../Custom/CTextArea";
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
  onSubmit,
  submitting,
  defaultCharacter = INIT_ENTRIES,
  errors,
}) => {
  const [input, setInput] = useState(defaultCharacter);
  const [limit, setLimit] = useState(20);

  const submitForm = (event) => {
    event.preventDefault();

    onSubmit({
      ...input,
      description: removeEmptyParagraphs(input.description),
      limit,
      stamina: limit,
      endurance: limit,
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
                <CTextInput
                  label="Name"
                  value={input.name}
                  onChange={(newValue) => handleChangeInput("name", newValue)}
                  errors={responseErrors(errors, "name")}
                />
              </Row>
              <Row>
                <CTextArea
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
                    title="Level and Limit"
                    onChange={(newValue) => {
                      handleChangeInput("level", newValue);
                      setLimit(20 + (newValue - 1) * 5);
                    }}
                    level={input.level}
                    limit={limit}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <AttributeStatsForm
                    stats={[
                      { title: "Physical", value: input.physical },
                      { title: "Mental", value: input.mental },
                      { title: "Social", value: input.social },
                    ]}
                    title="Base Stats"
                    onChange={handleChangeInput}
                  />
                </Col>
                <Col>
                  <AttributeStatsForm
                    stats={[
                      { title: "Awareness", value: input.awareness },
                      { title: "Prowess", value: input.prowess },
                      { title: "Resilience", value: input.resilience },
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
