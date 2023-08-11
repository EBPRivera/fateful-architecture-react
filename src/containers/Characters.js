import _ from "lodash";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Spinner, Container, Row, Col, Button } from "react-bootstrap";

import useAuthorized from "../hooks/useAuthorized";
import useGuest from "../hooks/useGuest";
import useAxiosInstance from "../hooks/useAxiosInstance";
import { INITIAL_ERROR } from "../globals";
import CharactersList from "../components/CharactersList";
import SAError from "../components/Custom/SAError";

const Characters = () => {
  const navigate = useNavigate();
  const axiosInstance = useAxiosInstance();
  const { id } = useSelector((state) => state.user);
  const { character } = useSelector((state) => state.guestCharacter);
  const [characters, setCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(INITIAL_ERROR);
  const isAuthorized = useAuthorized();
  const isGuest = useGuest();

  const fetchCharacters = async () => {
    setIsLoading(true);

    await axiosInstance
      .get(`users/${id}/characters`)
      .then(({ data }) => {
        setCharacters(data);
      })
      .catch(() => {
        setError({ hasError: true, messages: ["Failed to fetch characters"] });
      });

    setIsLoading(false);
  };

  useEffect(() => {
    if (isAuthorized) {
      fetchCharacters();
    } else if (isGuest) {
      if (_.isNull(character)) {
        setCharacters([]);
      } else {
        setCharacters([character]);
      }
    } else {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderTable = () => {
    if (isLoading) {
      return (
        <Container>
          <Row>
            <Col>
              <Spinner />
            </Col>
          </Row>
        </Container>
      );
    } else if (error.hasError) {
      return (
        <Container>
          {_.map(error.messages, (message, key) => (
            <Row key={key}>
              <Col>
                <SAError dismissible onClose={() => setError(INITIAL_ERROR)}>
                  {message}
                </SAError>
              </Col>
            </Row>
          ))}
        </Container>
      );
    } else {
      return (
        <CharactersList
          characters={characters}
          fetchCharacters={isAuthorized ? fetchCharacters : () => {}}
        />
      );
    }
  };

  return (
    <Container id="characters-page">
      <Row>
        <h1>Characters Page</h1>
      </Row>
      <Row className="mb-3">
        <Col className="actions">
          <Button onClick={() => navigate("/characters/new")}>
            Create Character
          </Button>
        </Col>
      </Row>
      <Row>{renderTable()}</Row>
    </Container>
  );
};

export default Characters;
