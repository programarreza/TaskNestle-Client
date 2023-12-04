import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import AddAsset from "../Pages/Admin/AddAsset/AddAsset";
import AddEmployee from "../Pages/Admin/AddEmployee/AddEmployee";
import AllRequests from "../Pages/Admin/AllRequests/AllRequests";
import AssetList from "../Pages/Admin/AssetList/AssetList";
import CustomRequestList from "../Pages/Admin/CustomRequestList/CustomRequestList";
import MyEmployeeList from "../Pages/Admin/MyEmployeeList/MyEmployeeList";
import Payment from "../Pages/Admin/Payment/Payment";
import CustomRequest from "../Pages/Employee/CustomRequest/CustomRequest";
import MyAssets from "../Pages/Employee/MyAssets/MyAssets";
import MyTeam from "../Pages/Employee/MyTeam/MyTeam";
import RequestAnAsset from "../Pages/Employee/RequestAnAsset/RequestAnAsset";
import Home from "../Pages/Home/Home";
import JoinAdmin from "../Pages/JoinAdmin/JoinAdmin";
import JoinEmployee from "../Pages/JoinEmployee/JoinEmployee";
import Login from "../Pages/Login/Login";
import Package from "../Pages/Package/Package";
import ProductUpdate from "../components/Admin/ProductUpdate/ProductUpdate";
import AdminRoute from "./AdminRoute";
import EmployeeRoute from "./EmployeeRoute";

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
        element: <EmployeeRoute><CustomRequest /></EmployeeRoute>,
      },
      {
        path: "request-asset",
        element: <EmployeeRoute><RequestAnAsset /></EmployeeRoute>,
      },
      {
        path: "my-assets",
        element: <EmployeeRoute><MyAssets /></EmployeeRoute>,
      },
      {
        path: "my-team",
        element: <EmployeeRoute> <MyTeam /></EmployeeRoute>,
      },


      // admin territory
      {
        path: "add-asset",
        element: <AdminRoute><AddAsset /></AdminRoute>,
      },
      {
        path: "asset-list",
        element: <AdminRoute><AssetList /></AdminRoute>,
      },
      {
        path: "custom-request-list",
        element: <AdminRoute><CustomRequestList /></AdminRoute>,
      },
      {
        path: "my-employee-list",
        element: <AdminRoute><MyEmployeeList /></AdminRoute>,
      },
      {
        path: "all-request",
        element: <AdminRoute><AllRequests /></AdminRoute>,
      },
      {
        path: "payment",
        element: <Payment />,
      },

      {
        path: "add-employee",
        element: 
        <AdminRoute>
          <AddEmployee />
          </AdminRoute>,
      },

      {
        path: "package",
        element: <Package />,
      },

      {
        path: "/product-update/:id",
        element: <ProductUpdate />,
        loader: ({ params }) =>
          fetch(`https://task-nestle-server.vercel.app/asset/${params.id}`),
      },
    ],
  },
]);

export default router;
