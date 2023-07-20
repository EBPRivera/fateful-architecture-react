import _ from "lodash";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import CharacterForm from "../components/CharacterForm";
import useAxiosInstance from "../hooks/useAxiosInstance";
import useAuthorized from "../hooks/useAuthorized";
import { createGuestCharacter } from "../features/guestCharacter";

const CharacterEdit = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [submitting, setSubmitting] = useState(false);
  const axiosInstance = useAxiosInstance();
  const isAuthorized = useAuthorized();

  const hasCharacter =
    !_.isNull(location.state) && !_.isNull(location.state.character);

  useEffect(() => {
    if (!hasCharacter) {
      navigate("/characters");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const editCharacter = async (character) => {
    const { id } = location.state.character;
    setSubmitting(true);

    if (isAuthorized) {
      axiosInstance
        .put(`/users/${user.id}/characters/${id}`, { character })
        .then(() => {
          navigate("/characters");
        })
        .catch((e) => {
          console.log(e.message);
        });
    } else {
      dispatch(createGuestCharacter({ character }));
      navigate("/characters");
    }
  };

  return (
    <div id="edit-character-page">
      <h1>Editing: {location.state.character.name}</h1>
      {hasCharacter && (
        <CharacterForm
          submitting={submitting}
          handleSubmit={editCharacter}
          defaultCharacter={location.state.character}
        />
      )}
    </div>
  );
};

export default CharacterEdit;
