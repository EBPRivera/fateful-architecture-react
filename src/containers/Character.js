import _ from "lodash";
import { useEffect, useState, useRef, createContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";

import useAuthorized from "../hooks/useAuthorized";
import useAxiosInstance from "../hooks/useAxiosInstance";
import { updateGuestCharacter } from "../features/guestCharacter";
import CharacterTabs from "../components/CharacterTabs";
import CharacterStats from "../components/CharacterStats";
import CharacterSkills from "../components/CharacterSkills";
import CPageHeader from "../components/Custom/CPageHeader";

export const CharacterContext = createContext({
  character: {},
  setCharacter: () => {},
  handleUpdateCharacter: () => {},
});

const Character = () => {
  const [character, setCharacter] = useState();
  const characterRef = useRef(character);
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
      handleSetCharacter(location.state.character);
    }

    return () => {
      handleUpdateCharacter(characterRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSetCharacter = (character) => {
    setCharacter(character);
    characterRef.current = character;
  };

  const handleUpdateCharacter = async (character) => {
    if (_.isUndefined(character)) return;

    if (isAuthorized) {
      await axiosInstance.put(`/users/${user.id}/characters/${character.id}`, {
        character,
      });
    } else {
      dispatch(updateGuestCharacter({ character }));
    }
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
          <Col>
            <CharacterTabs />
          </Col>
        </Row>
        <Row className="character-stats">
          <CharacterStats />
        </Row>
        <Row className="character-skills">
          <CharacterSkills />
        </Row>
      </>
    );
  };

  return (
    <CharacterContext.Provider
      value={{
        character,
        setCharacter: handleSetCharacter,
        handleUpdateCharacter,
      }}
    >
      <CPageHeader>{renderHeader()}</CPageHeader>
      <Container id="character-page" className="pt-3">
        {renderDetails()}
      </Container>
    </CharacterContext.Provider>
  );
};

export default Character;
