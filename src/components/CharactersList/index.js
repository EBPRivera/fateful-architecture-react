import _ from "lodash";
import { Table } from "react-bootstrap";

import CharacterItem from "./CharacterItem";

const CharactersList = ({ characters, fetchCharacters }) => {
  const renderCharacters = () => {
    if (!_.isEmpty(characters)) {
      return _.map(characters, (character, key) => (
        <CharacterItem
          character={character}
          key={key}
          fetchCharacters={fetchCharacters}
        />
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
    <Table striped bordered hover className="characters-list">
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
