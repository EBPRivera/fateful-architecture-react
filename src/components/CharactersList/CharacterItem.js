import _ from "lodash";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import useAxiosInstance from "../../hooks/useAxiosInstance";

const CharacterItem = ({ character, fetchCharacters }) => {
  const navigate = useNavigate();
  const axiosInstance = useAxiosInstance();
  const user = useSelector((state) => state.user);
  const [disabled, setDisabled] = useState(false);

  const { name, description, id } = character;

  const navigateToCharacter = () => {
    navigate(`/characters/${_.kebabCase(name)}`, { state: { character } });
  };

  const handleDelete = async () => {
    setDisabled(true);

    axiosInstance
      .delete(`users/${user.id}/characters/${id}`)
      .then(() => {
        fetchCharacters();
      })
      .catch((e) => {
        console.log(e.message);
      });
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
