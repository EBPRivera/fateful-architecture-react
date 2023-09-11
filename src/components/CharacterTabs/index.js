import { Tab, Tabs } from "react-bootstrap";

import CharacterDescription from "./CharacterDescription";
import CharacterCombatActions from "./CharacterCombatActions";

const CharacterTabs = ({ character }) => {
  const { description } = character;

  return (
    <Tabs className="character-tabs" defaultActiveKey="description">
      <Tab eventKey="description" title="Description">
        <CharacterDescription description={description} />
      </Tab>
      <Tab eventKey="combatActions" title="Combat Actions">
        <CharacterCombatActions />
      </Tab>
    </Tabs>
  );
};

export default CharacterTabs;
