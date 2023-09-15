import _ from "lodash";

const hasEmpty = (collection) => {
  let hasEmpty = false;

  _.forEach(collection, (item) => {
    if (_.isEmpty(item)) {
      hasEmpty = true;
      return false;
    }
  });

  return hasEmpty;
};

export default hasEmpty;
