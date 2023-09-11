import _ from "lodash";

import CCard from "../Custom/CCard";

const CharacterDescription = ({ description }) => {
  let paragraphs = [];
  if (_.isEmpty(description)) {
    paragraphs = ["No description provided"];
  } else {
    paragraphs = _.split(description, "\n");
  }

  return (
    <CCard>
      {_.map(paragraphs, (paragraph, key) => (
        <p key={key}>{paragraph}</p>
      ))}
    </CCard>
  );
};

export default CharacterDescription;
