import About from "../../components/About/About";
import MyCustomRequest from "../../components/Employee/MyCustomRequest";
import Banner from "../../components/Header/Banner/Bannar";
import Packages from "../../components/Packages/Packages";

const Home = () => {
  return (
    <div>
      {/* without login */}
      <Banner />
      <Packages />
      <About />

      {/* employee section */}
      <MyCustomRequest />

    </div>
  );
};

export default Home;
