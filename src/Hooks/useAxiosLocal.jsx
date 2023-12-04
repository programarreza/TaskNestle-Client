import axios from "axios";

const axiosLocal = axios.create({
  baseURL: "https://task-nestle-server.vercel.app",
});
const useAxiosLocal = () => {
  return axiosLocal;
};

export default useAxiosLocal;
