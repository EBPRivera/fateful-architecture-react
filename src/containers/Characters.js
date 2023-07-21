import _ from "lodash";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Spinner, Container, Row, Col, Button } from "react-bootstrap";

import useAuthorized from "../hooks/useAuthorized";
import useGuest from "../hooks/useGuest";
import useAxiosInstance from "../hooks/useAxiosInstance";
import CharactersList from "../components/CharactersList";

const Characters = () => {
  const isAuthorized = useAuthorized();
  const isGuest = useGuest();
  const navigate = useNavigate();
  const axiosInstance = useAxiosInstance();
  const { id } = useSelector((state) => state.user);
  const { character } = useSelector((state) => state.guestCharacter);
  const [characters, setCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchCharacters = async () => {
    setIsLoading(true);

    axiosInstance
      .get(`users/${id}/characters`)
      .then(({ data }) => {
        setCharacters(data);
        setIsLoading(false);
      })
      .catch((e) => {
        console.log(e.message);
        setIsLoading(false);
      });
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
    return isLoading ? (
      <Container>
        <Row>
          <Col>
            <Spinner />
          </Col>
        </Row>
      </Container>
    ) : (
      <CharactersList
        characters={characters}
        fetchCharacters={isAuthorized ? fetchCharacters : () => {}}
      />
    );
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
