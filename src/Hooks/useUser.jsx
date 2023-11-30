import { useQuery } from "@tanstack/react-query";
import { getPendingRole } from "../api/auth";
import useAuth from "./useAuth";

const useUser = () => {
  const { user, loading } = useAuth();
  const { data: users, isLoading, refetch } = useQuery({
    enabled: !loading && !!user?.email,
    queryFn: async () => await getPendingRole(user?.email),
    queryKey: ["user"],
  });
  console.log(users);
  return [users, refetch, isLoading];
};

export default useUser;
