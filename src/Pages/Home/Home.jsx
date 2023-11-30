import About from "../../components/About/About";
import Banner from "../../components/Header/Banner/Bannar";
import Packages from "../../components/Packages/Packages";
import EmployeeHome from "../Employee/EmployeeHome/EmployeeHome";

const Home = () => {
  return (
    <div>
      {/* without login */}
      <Banner />
      <Packages />
      <About />

      {/* employee section */}
      
      <EmployeeHome />
    </div>
  );
};

export default Home;
