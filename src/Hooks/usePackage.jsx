import { useQuery } from "@tanstack/react-query";
import { getPackage } from "../api/auth";
import useAuth from "./useAuth";

const usePackage = () => {
  const { loading } = useAuth();
  const {
    data: packages,
    isLoading,
    refetch,
  } = useQuery({
    enabled: !loading ,
    queryFn: async () => await getPackage(),
    queryKey: ["package"],
  });
  console.log(packages);
  return [packages, refetch, isLoading];
};

export default usePackage;
