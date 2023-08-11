import _ from "lodash";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import useAxiosInstance from "../hooks/useAxiosInstance";
import useAuthorized from "../hooks/useAuthorized";
import { createGuestCharacter } from "../features/guestCharacter";
import CharacterForm from "../components/CharacterForm";

const CharacterNew = () => {
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
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
          if (!_.isUndefined(e.response) && !_.isNull(e.response)) {
            setErrors(e.response.data);
          }
          setSubmitting(false);
        });
    } else {
      dispatch(createGuestCharacter({ character }));
      setSubmitting(false);
      navigate("/characters");
    }
  };

  return (
    <div id="new-character-page">
      <h1>New Character</h1>
      <CharacterForm
        onSubmit={createCharacter}
        submitting={submitting}
        errors={errors}
      />
    </div>
  );
};

export default CharacterNew;
