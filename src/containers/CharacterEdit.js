import _ from "lodash";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";

import useAxiosInstance from "../hooks/useAxiosInstance";
import useAuthorized from "../hooks/useAuthorized";
import { createGuestCharacter } from "../features/guestCharacter";
import CharacterForm from "../components/CharacterForm";
import CPageHeader from "../components/Custom/CPageHeader";

const CharacterEdit = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
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

  const navigateFromPage = (character) => {
    if (_.isUndefined(location.state.from)) {
      navigate(`/characters/${_.kebabCase(character.name)}`, {
        state: { character },
      });
    } else {
      navigate(location.state.from, { state: { character } });
    }
  };

  const handleEditCharacter = async (character) => {
    const { id } = location.state.character;
    setSubmitting(true);

    if (isAuthorized) {
      axiosInstance
        .put(`/users/${user.id}/characters/${id}`, { character })
        .then(() => {
          navigateFromPage(character);
        })
        .catch((e) => {
          if (!_.isUndefined(e.response) && !_.isNull(e.response)) {
            setErrors(e.response.data);
          }
          setSubmitting(false);
        });
    } else {
      dispatch(createGuestCharacter({ character }));
      navigateFromPage(character);
    }
  };

  return (
    <>
      <CPageHeader>
        <h2>Editing {location.state.character.name}</h2>
      </CPageHeader>
      <Container id="edit-character-page" className="pt-3">
        {hasCharacter && (
          <CharacterForm
            submitting={submitting}
            onSubmit={handleEditCharacter}
            defaultCharacter={location.state.character}
            errors={errors}
          />
        )}
      </Container>
    </>
  );
};

export default CharacterEdit;
