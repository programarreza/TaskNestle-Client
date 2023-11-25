import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home/Home";
import JoinEmployee from "../Pages/JoinEmployee/JoinEmployee";
import Login from "../Pages/Login/Login";
import JoinAdmin from "../Pages/JoinAdmin/JoinAdmin";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
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
    ],
  },
]);

export default router;
