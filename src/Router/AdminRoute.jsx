import { Navigate } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import useUserRole from "../Hooks/useUserRole";
import Loading from "../components/Loading/Loading";
import PropTypes from 'prop-types'; 

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const [userRole, _, isRoleLoading] = useUserRole();
  console.log(userRole);

  if (loading || isRoleLoading) {
    return <Loading></Loading>;
  }

  if (!loading && !isRoleLoading && user && userRole === "admin") {
    return children;
  }

  return <Navigate to={"/"} ></Navigate>;
};

export default AdminRoute;
AdminRoute.propTypes ={
	children: PropTypes.node 
}
