import AuthGuard from "../guard/authGuard";
import Layout from "../layout/Layout";
import Categori from "../page/category/Category";
import Dashboard from "../page/dashboard/Dashboard";
import Profile from "../page/profile/Profile";

export const indexRouter: any = {
  path: "/",
  element: (
    <AuthGuard>
      <Layout />
    </AuthGuard>
  ),
  children: [
    { path: "/dashboard", element: <Dashboard /> },
    { path: "/profile", element: <Profile /> },
    { path: "/category", element: <Categori /> },
  ],
};
