import useUserRole from "../../Hooks/useUserRole";
import About from "../../components/About/About";
import Banner from "../../components/Header/Banner/Bannar";
import AdminHome from "../Admin/AdminHome/AdminHome";
import EmployeeHome from "../Employee/EmployeeHome/EmployeeHome";
import Package from "../Package/Package";

const Home = () => {
  const [userRole] = useUserRole()
  
  return (
    <div>
      {/* without login */}
      <Banner />
      <Package/>
      <About />

      {/* employee section */}
      {userRole === "employee" && <EmployeeHome />}
      

      {/* admin section */}
      {userRole === "admin" && <AdminHome />}
      
    </div>
  );
};

export default Home;
