import Layout from '../components/layout/Layout';
import AuthGuard from '../guard/authGuard';
import About from '../pages/about/About';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import Dashboard from '../pages/Dashboard';
import EmailVerification from '../pages/license/EmailVerification';
import License from '../pages/license/License';
import VerifyAccount from '../pages/auth/VerifyAccount';
import LicenseMng from '../pages/license/LicenseMng';
import path from 'path';
import AgentAccount from '../pages/seller/Account';
import LicenseHistory from '../pages/license/LicenseHistory';
import BuyComponent from '../pages/buy/BuyComponent';
import SellComponent from '../pages/sell/SellComponent';
import Product from '../pages/product/Product';
import Cart from '../pages/cart/Cart';

export const indexRouter: any = {
  path: '/',
  element: (
    <Layout />
  ),
  children: [
    { path: '/dashboard', element: <Dashboard /> },
    {
      path: '/license', children: [
        { path: '', element: <License /> },
        { path: 'email-verification', element: <EmailVerification /> },
      ]
    },
    { path: '/about', element: <About /> },
    {
      path: '/product', children: [
        { path: '', element: <Product /> }
      ]
    },
    {
      path: '/cart', children: [
        { path: '', element: <Cart /> }
      ]
    },
  ],
};
