import _ from "lodash";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import useAxiosInstance from "../../hooks/useAxiosInstance";
import useAuthorized from "../../hooks/useAuthorized";
import { deleteGuestCharacter } from "../../features/guestCharacter";

const CharacterItem = ({ character, fetchCharacters }) => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [disabled, setDisabled] = useState(false);
  const axiosInstance = useAxiosInstance();
  const isAuthorized = useAuthorized();

  const { name, description, id } = character;
  const characterPath = `/characters/${_.kebabCase(name)}`;

  const navigateToCharacter = () => {
    navigate(characterPath, { state: { character } });
  };

  const navigateToEditCharacter = () => {
    navigate(`${characterPath}/edit`, { state: { character } });
  };

  const handleDelete = async () => {
    setDisabled(true);

    if (isAuthorized) {
      axiosInstance
        .delete(`users/${user.id}/characters/${id}`)
        .then(() => {
          fetchCharacters();
        })
        .catch((e) => {
          console.log(e.message);
        });
    } else {
      dispatch(deleteGuestCharacter());
      navigate("/characters/new");
    }
  };

  return (
    <tr>
      <td>{name}</td>
      <td>{_.truncate(description)}</td>
      <td className="character-item-actions">
        <Button onClick={navigateToCharacter} size="sm" disabled={disabled}>
          View
        </Button>
        <Button
          onClick={navigateToEditCharacter}
          variant="success"
          size="sm"
          disabled={disabled}
        >
          Edit
        </Button>
        <Button
          onClick={handleDelete}
          variant="danger"
          size="sm"
          disabled={disabled}
        >
          Delete
        </Button>
      </td>
    </tr>
  );
};

export default CharacterItem;
