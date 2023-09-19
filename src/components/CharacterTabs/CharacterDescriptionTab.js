import _ from "lodash";
import { useContext } from "react";
import { Card } from "react-bootstrap";

import { CharacterContext } from "../../containers/Character";

const CharacterDescriptionTab = () => {
  const { character } = useContext(CharacterContext);
  const { description } = character;

  let paragraphs = [];
  if (_.isEmpty(description)) {
    paragraphs = ["No description provided"];
  } else {
    paragraphs = _.split(description, "\n");
  }

  return (
    <Card className="p-3">
      {_.map(paragraphs, (paragraph, key) => (
        <p key={key}>{paragraph}</p>
      ))}
    </Card>
  );
};

export default CharacterDescriptionTab;
