import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hooks/useAuth";
import Loading from "../Loading/Loading";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const MyMonthlyRequests = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: requestAssets, } = useQuery({
    enabled: !loading,
    queryFn: async () => await axiosSecure(`/monthly-request/${user?.email}`),
    queryKey: ["frequently"],
  });

  if (loading || !requestAssets) {
    return <Loading />;
  }
  console.log(requestAssets.data);


  return <div>MyMonthlyRequests</div>;
};

export default MyMonthlyRequests;
