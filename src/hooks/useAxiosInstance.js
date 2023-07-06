import axios from "axios";
import { useSelector } from "react-redux";

const useAxiosInstance = () => {
  const { token } = useSelector((state) => state.user);
  const axiosInstance = axios.create({
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return axiosInstance;
};

export default useAxiosInstance;
