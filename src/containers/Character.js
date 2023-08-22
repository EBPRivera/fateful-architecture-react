import _ from "lodash";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Container, Row, Col, Button, Tabs, Tab, Card } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";

import useAuthorized from "../hooks/useAuthorized";
import useAxiosInstance from "../hooks/useAxiosInstance";
import { updateGuestCharacter } from "../features/guestCharacter";
import combatActions from "../json/combatActions";
import CharacterStats from "../components/CharacterStats";
import CharacterSkills from "../components/CharacterSkills";
import CCard from "../components/Custom/CCard";
import CPageHeader from "../components/Custom/CPageHeader";

const Character = () => {
  const [character, setCharacter] = useState();
  const location = useLocation();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const isAuthorized = useAuthorized();
  const axiosInstance = useAxiosInstance();

  useEffect(() => {
    if (_.isNull(location.state) || _.isNull(location.state.character)) {
      navigate("/characters");
    } else {
      setCharacter(location.state.character);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    return () => {
      handleUpdateCharacter();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [character]);

  const handleUpdateCharacter = async () => {
    if (_.isUndefined(character)) return;

    if (isAuthorized) {
      await axiosInstance.put(`/users/${user.id}/characters/${character.id}`, {
        character,
      });
    } else {
      dispatch(updateGuestCharacter({ character }));
    }
  };

  const handleChangeConstitution = (constitution) => {
    setCharacter((character) => ({ ...character, ...constitution }));
  };

  const renderDescription = () => {
    const { description } = character;

    let paragraphs = [];
    if (_.isEmpty(description)) {
      paragraphs = ["No description provided"];
    } else {
      paragraphs = _.split(description, "\n");
    }

    return (
      <CCard>
        {_.map(paragraphs, (paragraph, key) => (
          <p key={key}>{paragraph}</p>
        ))}
      </CCard>
    );
  };

  const renderNotes = (notes) => {
    if (_.isUndefined(notes) || _.isEmpty(notes)) return;

    return (
      <ul>
        {_.map(notes, (note, key) => {
          return <li key={key}>{note}</li>;
        })}
      </ul>
    );
  };

  const renderCombatActions = () => {
    return (
      <Card className="p-3">
        <ul>
          {_.map(combatActions, (combatAction, combatActionKey) => {
            return (
              <li key={combatActionKey}>
                <b>{combatActionKey}</b>
                <ol>
                  {_.map(combatAction, (action, actionKey) => {
                    return (
                      <li className="pb-2" key={actionKey}>
                        <b>{`${action.name}. `}</b>
                        {action.description}
                        {renderNotes(action.notes)}
                      </li>
                    );
                  })}
                </ol>
              </li>
            );
          })}
        </ul>
      </Card>
    );
  };

  const renderLookup = () => {
    return (
      <Tabs className="character-tabs" defaultActiveKey="description">
        <Tab eventKey="description" title="Description">
          {renderDescription()}
        </Tab>
        <Tab eventKey="combatActions" title="Combat Actions">
          {renderCombatActions()}
        </Tab>
      </Tabs>
    );
  };

  const renderHeader = () => {
    if (_.isUndefined(character)) return;
    const { name } = character;
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
                character,
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
    if (_.isUndefined(character)) return;

    return (
      <>
        <Row className="character-heading">
          <Col>{renderLookup()}</Col>
        </Row>
        <Row className="character-stats">
          <CharacterStats
            character={character}
            onChange={handleChangeConstitution}
          />
        </Row>
        <Row className="character-skills">
          <CharacterSkills />
        </Row>
      </>
    );
  };

  return (
    <>
      <CPageHeader>{renderHeader()}</CPageHeader>
      <Container id="character-page" className="pt-3">
        {renderDetails()}
      </Container>
    </>
  );
};

export default Character;
