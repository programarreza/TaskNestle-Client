import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import AddAsset from "../Pages/Admin/AddAsset/AddAsset";
import AssetList from "../Pages/Admin/AssetList/AssetList";
import CustomRequest from "../Pages/Employee/CustomRequest/CustomRequest";
import Home from "../Pages/Home/Home";
import JoinAdmin from "../Pages/JoinAdmin/JoinAdmin";
import JoinEmployee from "../Pages/JoinEmployee/JoinEmployee";
import Login from "../Pages/Login/Login";
import ProductUpdate from "../components/Admin/ProductUpdate/ProductUpdate";
import CustomRequestList from "../Pages/Admin/CustomRequestList/CustomRequestList";

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

      // admin route
      {
        path: "add-asset",
        element: <AddAsset />,
      },
      {
        path: "asset-list",
        element: <AssetList />,
      },
      {
        path: "custom-request-list",
        element: <CustomRequestList />,
      },
      {
        path: "/product-update/:id",
        element: <ProductUpdate />,
        loader: ({ params }) =>
          fetch(`http://localhost:5000/asset/${params.id}`),
      },
    ],
  },
]);

export default router;
