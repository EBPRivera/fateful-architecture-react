import _ from "lodash";
import { useSelector } from "react-redux";

const useAuthorized = () => {
  const { id, token } = useSelector((state) => state.user);

  return !_.isNull(id) && !_.isNull(token);
};

export default useAuthorized;
