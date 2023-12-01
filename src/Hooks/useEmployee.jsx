import { useQuery } from "@tanstack/react-query";
import { getEmployee } from "../api/auth";
import useAuth from "./useAuth";

const useEmployee = () => {
  const { loading } = useAuth();

  const { data: employee, refetch } = useQuery({
    enabled: !loading,
    queryFn: async () => await getEmployee(),
    queryKey: ["employee"],
  });
  return [employee, refetch, loading]
};

export default useEmployee;
