import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home/Home";
import JoinEmployee from "../Pages/JoinEmployee/JoinEmployee";
import Login from "../Pages/Login/Login";
import JoinAdmin from "../Pages/JoinAdmin/JoinAdmin";
import CustomRequest from "../Pages/Employee/CustomRequest/CustomRequest";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      // without login
      {
        path: "join-employee",
        element: <JoinEmployee />,
      },
      {
        path: "join-admin",
        element: <JoinAdmin />,
      },
      {
        path: "login",
        element: <Login />,
      },

      // logged in employee
      {
        path: "custom-request",
        element: <CustomRequest />,
      },
    ],
  },
]);

export default router;
