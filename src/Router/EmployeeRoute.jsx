import { Navigate } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import useUserRole from "../Hooks/useUserRole";
import Loading from "../components/Loading/Loading";
import PropTypes from 'prop-types'; 

const EmployeeRoute = ({children}) => {
	const { user, loading } = useAuth();
  const [userRole] = useUserRole();
  console.log(userRole);

  if (loading && userRole) {
    return <Loading></Loading>;
  }

  if (user && userRole === "employee") {
    return children;
  }

  return <Navigate to={"/"} ></Navigate>;
};

export default EmployeeRoute;
EmployeeRoute.propTypes ={
	children: PropTypes.node 
}