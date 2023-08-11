import _ from "lodash";

export const responseErrors = (responseErrors, attribute = null) => {
  // Error format from requests
  // { key: [string] }

  let errors = [];

  if (_.isNull(attribute)) {
    _.map(responseErrors, (errorMessages, errorAttribute) =>
      _.map(errorMessages, (message) => {
        errors = [...errors, `${errorAttribute}: ${message}`];
      })
    );
  } else if (!_.isUndefined(responseErrors[attribute])) {
    errors = _.map(responseErrors[attribute], (message) => message);
  }

  return errors;
};

export const filteredOutResponseErrors = (
  responseErrors,
  filteredAttributes = []
) => {
  let errors = [];

  _.map(responseErrors, (errorMessages, attribute) => {
    if (_.includes(filteredAttributes, attribute)) return;

    _.map(errorMessages, (message) => {
      errors = [...errors, message];
    });
  });

  return errors;
};
