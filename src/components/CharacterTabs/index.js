import { Tab, Tabs } from "react-bootstrap";

import CharacterDescriptionTab from "./CharacterDescriptionTab";
import CombatActionsTab from "./CombatActionsTab";
import FateConnectionsTab from "./FateConnectionsTab";

const CharacterTabs = () => {
  return (
    <Tabs className="character-tabs" defaultActiveKey="description">
      <Tab eventKey="description" title="Description">
        <CharacterDescriptionTab />
      </Tab>
      <Tab eventKey="combatActions" title="Combat Actions">
        <CombatActionsTab />
      </Tab>
      <Tab eventKey="fateAndConnections" title="Fate and Connections">
        <FateConnectionsTab />
      </Tab>
    </Tabs>
  );
};

export default CharacterTabs;
