import _ from "lodash";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Container } from "react-bootstrap";

import hasEmpty from "../helpers/hasEmpty";
import useAxiosInstance from "../hooks/useAxiosInstance";
import useAuthorized from "../hooks/useAuthorized";
import { createGuestCharacter } from "../features/guestCharacter";
import CPageHeader from "../components/Custom/CPageHeader";
import NewCharacterForm from "../components/NewCharacterForm";

const CharacterNew = () => {
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const { id } = useSelector((state) => state.user);
  const axiosInstance = useAxiosInstance();
  const navigate = useNavigate();
  const isAuthorized = useAuthorized();
  const dispatch = useDispatch();

  const hasUnauthorizedErrors = (character) => {
    let hasErrors = false;
    let errors = {};

    if (_.isEmpty(character.name)) {
      errors = { ...errors, name: ["can't be blank"] };
      hasErrors = true;
    }
    if (
      hasEmpty(_.map(character.connections, (connection) => connection.name))
    ) {
      errors = { ...errors, connections: ["connection name can't be blank"] };
      hasErrors = true;
    }

    setErrors(errors);
    return hasErrors;
  };

  const handleCreateCharacter = async (character) => {
    setSubmitting(true);

    if (isAuthorized) {
      await axiosInstance
        .post(`users/${id}/characters`, { character })
        .then(() => {
          navigate("/characters");
        })
        .catch((e) => {
          if (!_.isUndefined(e.response) && !_.isNull(e.response)) {
            setErrors(e.response.data);
          }
        });
    } else {
      if (!hasUnauthorizedErrors(character)) {
        dispatch(createGuestCharacter({ character }));
        navigate(`/characters/${_.kebabCase(character.name)}`, {
          state: { character },
        });
      }
    }

    setSubmitting(false);
  };

  return (
    <>
      <CPageHeader>
        <h2>Create Your Character</h2>
      </CPageHeader>
      <Container id="new-character-page" className="py-3">
        <NewCharacterForm
          onSubmit={handleCreateCharacter}
          submitting={submitting}
          errors={errors}
        />
      </Container>
    </>
  );
};

export default CharacterNew;
