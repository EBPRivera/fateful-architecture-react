import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";

import useAxiosInstance from "../hooks/useAxiosInstance";
import useAuthorized from "../hooks/useAuthorized";
import { createGuestCharacter } from "../features/guestCharacter";
import { INITIAL_ERROR } from "../globals";
import CharacterForm from "../components/CharacterForm";
import SAError from "../components/Custom/SAError";

const CharacterNew = () => {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(INITIAL_ERROR);
  const { id } = useSelector((state) => state.user);
  const axiosInstance = useAxiosInstance();
  const navigate = useNavigate();
  const isAuthorized = useAuthorized();
  const dispatch = useDispatch();

  const createCharacter = async (character) => {
    setSubmitting(true);

    if (isAuthorized) {
      axiosInstance
        .post(`users/${id}/characters`, { character })
        .then(() => {
          navigate("/characters");
        })
        .catch((e) => {
          setError({ hasError: true, message: e.message });
          setSubmitting(false);
        });
    } else {
      dispatch(createGuestCharacter({ character }));
      setSubmitting(false);
      navigate("/characters");
    }
  };

  const renderErrorMessage = () => (
    <Container>
      <Row>
        <Col>
          <SAError dismissible onClose={() => setError(INITIAL_ERROR)}>
            {error.message}
          </SAError>
        </Col>
      </Row>
    </Container>
  );

  return (
    <div id="new-character-page">
      <h1>New Character</h1>
      {error.hasError && renderErrorMessage()}
      <CharacterForm handleSubmit={createCharacter} submitting={submitting} />
    </div>
  );
};

export default CharacterNew;
