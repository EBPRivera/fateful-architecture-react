import _ from "lodash";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const CharacterItem = ({ character }) => {
  const navigate = useNavigate();
  const { name, description } = character;

  const navigateToCharacter = () => {
    navigate(`/characters/${_.kebabCase(name)}`, { state: { character } });
  };

  return (
    <tr>
      <td>{name}</td>
      <td>{description}</td>
      <td>
        <Button onClick={navigateToCharacter}>View</Button>
      </td>
    </tr>
  );
};

export default CharacterItem;
