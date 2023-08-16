import _ from "lodash";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Container } from "react-bootstrap";

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
      if (_.isEmpty(character.name)) {
        setErrors({ name: ["can't be blank"] });
      } else {
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
      <Container id="new-character-page" className="pt-3">
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
