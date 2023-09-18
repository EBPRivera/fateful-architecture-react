import _ from "lodash";

const parseParagraphs = (input) => {
  return _.filter(_.split(input, "\n"), (paragraph) => !_.isEmpty(paragraph));
};

const removeEmptyParagraphs = (input) => {
  return _.join(parseParagraphs(input), "\n");
};

export { parseParagraphs, removeEmptyParagraphs };
