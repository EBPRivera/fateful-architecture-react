import _ from "lodash";
import { Table } from "react-bootstrap";

import CharacterItem from "./CharacterItem";

const CharactersList = ({ characters }) => {
  const renderCharacters = () => {
    if (!_.isEmpty(characters)) {
      return _.map(characters, (character, key) => (
        <CharacterItem character={character} key={key} />
      ));
    } else {
      return (
        <tr>
          <td colSpan={3}>You have no characters</td>
        </tr>
      );
    }
  };

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Name</th>
          <th>Description</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>{renderCharacters()}</tbody>
    </Table>
  );
};

export default CharactersList;
