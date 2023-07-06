import _ from "lodash";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";

const useAuthNavigation = () => {
  const { id, token } = useSelector((state) => state.user);
  const navigate = useNavigate();

  return (path) => {
    if (!_.isNull(id) && !_.isNull(token)) {
      navigate(path);
    } else {
      navigate("/");
    }
  };
};

export default useAuthNavigation;
