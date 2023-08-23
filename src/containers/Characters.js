import _ from "lodash";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Spinner, Container, Row, Col, Button } from "react-bootstrap";

import useAuthorized from "../hooks/useAuthorized";
import useAxiosInstance from "../hooks/useAxiosInstance";
import { INITIAL_ERROR } from "../globals";
import CharactersList from "../components/CharactersList";
import CError from "../components/Custom/CError";
import CPageHeader from "../components/Custom/CPageHeader";

const Characters = () => {
  const navigate = useNavigate();
  const axiosInstance = useAxiosInstance();
  const { id } = useSelector((state) => state.user);
  const [characters, setCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(INITIAL_ERROR);
  const isAuthorized = useAuthorized();

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
                <CError dismissible onClose={() => setError(INITIAL_ERROR)}>
                  {message}
                </CError>
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
    <>
      <CPageHeader className="d-flex" test>
        <h2>Your Characters</h2>
        <Button className="ms-3" onClick={() => navigate("/characters/new")}>
          Create Character
        </Button>
      </CPageHeader>
      <Container id="characters-page" className="pt-3">
        <Row>{renderTable()}</Row>
      </Container>
    </>
  );
};

export default Characters;
