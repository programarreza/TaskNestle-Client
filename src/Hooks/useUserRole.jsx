import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import { getUserRole } from "../api/auth";

const useUserRole = () => {
  const { user, loading } = useAuth();
  const { data: role, isLoading } = useQuery({
    enabled: !loading && !!user?.email,
    queryFn: async () => await getUserRole(user?.email),
    queryKey: ["role"],
  });
  console.log(role);
  return [role, isLoading];
};

export default useUserRole;
