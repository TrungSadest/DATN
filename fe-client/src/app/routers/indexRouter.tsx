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
      path: '/auth', children: [
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: 'verify-account/:verifyKey', element: <VerifyAccount /> },
        { path: 'license-mng', element: <AuthGuard><LicenseHistory /></AuthGuard> },
      ]
    },
    {
      path: '/mng', children: [
        { path: 'account', element: <AuthGuard><AgentAccount /></AuthGuard> },
        { path: 'license-mng', element: <AuthGuard><LicenseMng /></AuthGuard> },
      ]
    },
    //BĐS
    {
      path: '/buy', children: [
        { path: '', element: <BuyComponent /> }
      ]
    },
    {
      path: '/sell', children: [
        { path: '', element: <SellComponent /> }
      ]
    }
    // { path: '/discount-policy', element: <DiscountPolicy /> },
  ],
};
