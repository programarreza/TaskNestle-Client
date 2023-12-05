import { Navigate } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import useUserRole from "../Hooks/useUserRole";
import Loading from "../components/Loading/Loading";
import PropTypes from 'prop-types'; 

const EmployeeRoute = ({children}) => {
	const { user, loading } = useAuth();
  const [userRole, _, isRoleLoading] = useUserRole();
  console.log(userRole);
  console.log(isRoleLoading);

  if (loading || isRoleLoading) {
    return <Loading></Loading>;
  }


  if (!loading && !isRoleLoading && user && userRole === "employee") {
    return children;
  }
  else{

    return <Navigate to={"/"} ></Navigate>;
  }

};

export default EmployeeRoute;
EmployeeRoute.propTypes ={
	children: PropTypes.node 
}