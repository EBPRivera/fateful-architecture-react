import _ from "lodash";
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

import statProfiles from "../../json/statProfiles";
import stats from "../../json/stats";
import { responseErrors } from "../../helpers/errors";
import { removeEmptyParagraphs } from "../../helpers/input";
import SATextInput from "../Custom/SATextInput";
import SATextArea from "../Custom/SATextArea";
import AttributeStatsForm from "./AttributeStatsForm";

const INIT_BASIC_INFO = {
  name: "",
  description: "",
};

const INIT_PROFILES = {
  base: _.keys(statProfiles)[0],
  complementary: _.keys(statProfiles)[1],
};

const INIT_STAT_ALLOCATION = {
  base: stats.base,
  complementary: stats.complementary,
};

const NewCharacterForm = ({ onSubmit, submitting, errors }) => {
  const [basicInformation, setBasicInformation] = useState(INIT_BASIC_INFO);
  const [profiles, setProfiles] = useState(INIT_PROFILES);
  const [statAllocation, setStatAllocation] = useState(INIT_STAT_ALLOCATION);

  const handleSubmitForm = (event) => {
    event.preventDefault();

    let baseStats = {};
    let complementaryStats = {};

    _.map(statAllocation.base, (val, index) => {
      baseStats = { ...baseStats, [val]: statProfiles[profiles.base][index] };
    });
    _.map(statAllocation.complementary, (val, index) => {
      complementaryStats = {
        ...complementaryStats,
        [val]: statProfiles[profiles.complementary][index],
      };
    });

    const characterParams = {
      ...basicInformation,
      description: removeEmptyParagraphs(basicInformation.description),
      ...baseStats,
      ...complementaryStats,
      level: 1,
      limit: 20,
      stamina: 20,
      endurance: 20,
    };

    onSubmit(characterParams);
  };

  const handleChangeInput = (key, value) => {
    setBasicInformation((input) => ({ ...input, [key]: value }));
  };

  const handleChangeProfile = (key, value) => {
    const otherProfile = _.omit(profiles, key);

    if (!_.includes(_.values(otherProfile), value)) {
      setProfiles((profiles) => ({ ...profiles, [key]: value }));
    } else {
      setProfiles({
        ..._.mapValues(otherProfile, () => profiles[key]),
        [key]: value,
      });
    }
  };

  const handleChangeStatAllocation = (key, index, value) => {
    const swappedIndex = _.findIndex(statAllocation[key], (stat) =>
      _.isEqual(stat, value)
    );
    const swappedStat = statAllocation[key][index];

    let newStatAllocationArray = statAllocation[key];
    newStatAllocationArray[index] = value;
    newStatAllocationArray[swappedIndex] = swappedStat;

    setStatAllocation((statAllocation) => ({
      ...statAllocation,
      [key]: newStatAllocationArray,
    }));
  };

  return (
    <Container className="character-form">
      <Row>
        <Col as={Card}>
          <Form onSubmit={handleSubmitForm}>
            <Container>
              <Row>
                <SATextInput
                  label="Name"
                  value={basicInformation.name}
                  onChange={(newValue) => handleChangeInput("name", newValue)}
                  errors={responseErrors(errors, "name")}
                />
              </Row>
              <Row>
                <SATextArea
                  label="Description"
                  value={basicInformation.description}
                  onChange={(newValue) =>
                    handleChangeInput("description", newValue)
                  }
                />
              </Row>
              <hr />
              <Row>
                <Col as="h2">Stat Allocation</Col>
              </Row>
              <Row>
                <Col className="pb-3">
                  <AttributeStatsForm
                    onChangeProfile={handleChangeProfile}
                    onChangeStatAllocation={handleChangeStatAllocation}
                    profile={profiles.base}
                    statAllocation={statAllocation.base}
                    title="Base Stats"
                    type="base"
                  />
                </Col>
                <Col className="pb-3">
                  <AttributeStatsForm
                    onChangeProfile={handleChangeProfile}
                    onChangeStatAllocation={handleChangeStatAllocation}
                    profile={profiles.complementary}
                    statAllocation={statAllocation.complementary}
                    title="Complementary Stats"
                    type="complementary"
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

export default NewCharacterForm;
