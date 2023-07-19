import axios from "axios";
import { useSelector } from "react-redux";

const useAxiosInstance = () => {
  const { token } = useSelector((state) => state.user);
  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return axiosInstance;
};

export default useAxiosInstance;
