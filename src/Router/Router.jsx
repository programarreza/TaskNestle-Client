import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import AddAsset from "../Pages/Admin/AddAsset/AddAsset";
import AssetList from "../Pages/Admin/AssetList/AssetList";
import CustomRequestList from "../Pages/Admin/CustomRequestList/CustomRequestList";
import MyEmployeeList from "../Pages/Admin/MyEmployeeList/MyEmployeeList";
import CustomRequest from "../Pages/Employee/CustomRequest/CustomRequest";
import RequestAnAsset from "../Pages/Employee/RequestAnAsset/RequestAnAsset";
import Home from "../Pages/Home/Home";
import JoinAdmin from "../Pages/JoinAdmin/JoinAdmin";
import JoinEmployee from "../Pages/JoinEmployee/JoinEmployee";
import Login from "../Pages/Login/Login";
import ProductUpdate from "../components/Admin/ProductUpdate/ProductUpdate";
import AllRequests from "../Pages/Admin/AllRequests/AllRequests";
import MyAssets from "../Pages/Employee/MyAssets/MyAssets";
import MyTeam from "../Pages/Employee/MyTeam/MyTeam";
import Payment from "../Pages/Admin/Payment/Payment";
import AddEmployee from "../Pages/Admin/AddEmployee/AddEmployee";
import Package from "../Pages/Package/Package";

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

      // logged in employee territory
      {
        path: "custom-request",
        element: <CustomRequest />,
      },
      {
        path: "request-asset",
        element: <RequestAnAsset />,
      },
      {
        path: "my-assets",
        element: <MyAssets />,
      },
      {
        path: "my-team",
        element: <MyTeam />,
      },

      // admin territory
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
        path: "my-employee-list",
        element: <MyEmployeeList />,
      },
      {
        path: "all-request",
        element: <AllRequests />,
      },
      {
        path: "payment",
        element: <Payment />,
      },

      {
        path: "add-employee",
        element: <AddEmployee />,
      },

      {
        path: "package",
        element: <Package />,
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
