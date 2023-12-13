import { Outlet } from "react-router-dom";
import Navbar from "../components/shared/Navbar/Navbar";
import Aos from 'aos'
import 'aos/dist/aos.css'
import { useEffect } from "react";
const MainLayout = () => {
  useEffect(() => {
    Aos.init({duration: 1000})
  },[])
  return (
    <div>
		<Navbar/>
      <Outlet />
    </div>
  );
};

export default MainLayout;
