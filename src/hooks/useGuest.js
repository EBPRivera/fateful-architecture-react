import { useSelector } from "react-redux";

const useGuest = () => {
  const { isGuest } = useSelector((state) => state.user);

  return isGuest;
};

export default useGuest;
