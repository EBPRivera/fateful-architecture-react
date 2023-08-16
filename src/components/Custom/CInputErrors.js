import _ from "lodash";

const CInputErrors = ({ errors }) => {
  return (
    <ul className="input-errors mt-1">
      {_.map(errors, (error, key) => (
        <li key={key}>{error}</li>
      ))}
    </ul>
  );
};

export default CInputErrors;
