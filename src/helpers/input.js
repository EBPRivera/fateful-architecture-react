import _ from "lodash";

const removeEmptyParagraphs = (input) => {
  const filteredParagraphs = _.filter(
    _.split(input, "\n"),
    (paragraph) => !_.isEmpty(paragraph)
  );

  return _.join(filteredParagraphs, "\n");
};

export { removeEmptyParagraphs };
