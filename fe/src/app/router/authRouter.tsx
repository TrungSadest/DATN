import Layout from "../layout/Layout";
import Login from "../page/auth/Login";
import Dashboard from "../page/dashboard/Dashboard";
import Profile from "../page/profile/Profile";

export const authRouter: any = {
  path: "/",
  children: [
    { path: '/Login', element: <Login /> },
  ],
};
