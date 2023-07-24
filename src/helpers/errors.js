import _ from "lodash";

export const formatResponseErrors = (responseErrors) => {
  // Error format from requests
  // { key: [string] }

  let errors = [];

  _.map(responseErrors, (errorMessages, attribute) =>
    _.map(errorMessages, (message) => {
      errors = [...errors, `${attribute}: ${message}`];
    })
  );

  return errors;
};
