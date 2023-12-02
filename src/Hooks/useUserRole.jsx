import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import { getUserRole } from "../api/auth";

const useUserRole = () => {
  const { user, loading } = useAuth();
  const { data: users, isLoading } = useQuery({
    enabled: !loading && !!user?.email,
    queryFn: async () => await getUserRole(user?.email),
    queryKey: ["users"],
  });
  const userRole = users?.role;
  console.log(userRole);
  console.log(14, users);

  return [userRole, users, isLoading];
};

export default useUserRole;
