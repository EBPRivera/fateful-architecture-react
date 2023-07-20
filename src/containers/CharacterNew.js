import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import CharacterForm from "../components/CharacterForm";
import useAxiosInstance from "../hooks/useAxiosInstance";
import useAuthorized from "../hooks/useAuthorized";
import { createGuestCharacter } from "../features/guestCharacter";

const CharacterNew = () => {
  const [submitting, setSubmitting] = useState(false);
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
          console.log(e.message);
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
      <CharacterForm handleSubmit={createCharacter} submitting={submitting} />
    </div>
  );
};

export default CharacterNew;
