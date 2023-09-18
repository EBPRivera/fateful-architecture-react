import _ from "lodash";
import { Card } from "react-bootstrap";

const CharacterDescriptionTab = ({ description }) => {
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
