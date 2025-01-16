import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Account from "../pages/seller/Account";


export const authRouter: any = {
  path: "/",
  children: [
    { path: '/login', element: <Login /> },
    { path: '/account', element: <Account /> },
    { path: '/register', element: <Register /> },
  ],
};
