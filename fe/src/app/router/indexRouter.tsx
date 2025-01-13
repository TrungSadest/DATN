import AuthGuard from "../guard/authGuard";
import Layout from "../layout/Layout";
import Categori from "../page/category/Category";
import Dashboard from "../page/dashboard/Dashboard";
import Product from "../page/product/Product";
import ProductDetail from "../page/product/ProductDetail";
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
    { path: "/product", children: [
      { path: "", element: <Product /> },       
    ] },
    { path: "/product-detail", element: <ProductDetail /> },
  ],
};
