import { createBrowserRouter } from "react-router-dom";

import Home from "../pages/Home/Home";

import Login from "../Login/Login";
import SignUp from "../SignUp/SignUp";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../Layout/Dashboard";
import ManageUsers from "../pages/Dashboard/ManageUsers";
import useAdmin from "../hooks/useAdmin";
import Loading from "../components/Loading/Loading";
import Profile from "../pages/Dashboard/Profile";
import NotFound from "../pages/NotFoumd";

import AboutUs from "../pages/AboutUs";
import Supporters from "../pages/Supporters/Supporters";
import Donate from "../pages/Donate/Donate";

import Main from "../Layout/Main";

import ShowDonateInformation from "../pages/Dashboard/ShowDonateInformation";
import ShowFeedback from "../pages/Dashboard/ShowFeedback";


import AddVideos from "../pages/Dashboard/AddVideos";
import ManageStats from "../pages/Dashboard/ManageStats";

// Custom wrapper to restrict routes to admins
const AdminRoute = ({ children }) => {
  const [isAdmin, isAdminLoading] = useAdmin();
  if (isAdminLoading) return <div><Loading></Loading></div>;
  if (!isAdmin) return <div className="text-center py-10 text-red-500">Access Denied: Admins Only</div>;
  return children;
};

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/about",
        element: <AboutUs />,
      },
      {
        path: "/supporters",
        element: <Supporters />,
      },
      {
        path: "/donate",
        element: <Donate />,
      },
      {
        path: "login",
        element: <Login></Login>,
      },
      {
        path: "signup",
        element: <SignUp></SignUp>,
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    children: [
      // admin routes
      {
        path: "manage-users",
        element: (
          <AdminRoute>
            <ManageUsers />
          </AdminRoute>
        ),
      },

      {
        path: "donations",
        element: (
          <AdminRoute>
            <ShowDonateInformation />
          </AdminRoute>
        ),
      },
      {
        path: "add-videos",
        element: (
          <AdminRoute>
            <AddVideos />
          </AdminRoute>
        ),
      },
      {
        path: "manage-stats",
        element: (
          <AdminRoute>
            <ManageStats />
          </AdminRoute>
        ),
      },
      {
        path: "feedback",
        element: (
          <AdminRoute>
            <ShowFeedback />
          </AdminRoute>
        ),
      },


      {
        path: "*",
        element: <NotFound />,
      }
    ],
  },
]);