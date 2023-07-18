import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Card, Container, Row, Col } from "react-bootstrap";

import CharacterForm from "../components/CharacterForm";
import useAxiosInstance from "../hooks/useAxiosInstance";

const CharacterNew = () => {
  const [submitting, setSubmitting] = useState(false);
  const { id } = useSelector((state) => state.user);
  const axiosInstance = useAxiosInstance();
  const navigate = useNavigate();

  const createCharacter = async (character) => {
    setSubmitting(true);
    axiosInstance
      .post(`users/${id}/characters`, { character })
      .then(() => {
        navigate("/characters");
      })
      .catch((e) => {
        console.log(e.message);
        setSubmitting(false);
      });
  };

  return (
    <div id="new-character-page">
      <h1>New Character</h1>
      <Container>
        <Row>
          <Col as={Card}>
            <CharacterForm
              handleSubmit={createCharacter}
              submitting={submitting}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default CharacterNew;
