import './App.css';
import './assets/css/spinner.css';
// import './assets/css/style.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
// import 'bootstrap/dist/css/bootstrap.min.css';



import { Navigate, useRoutes } from 'react-router-dom';
import { Suspense } from 'react';

import { ToastContainer } from 'react-toastify';
import NotFound from './app/pages/error/NotFound';
import NotPermission from './app/pages/error/NotPermission';
import { indexRouter } from './app/routers/indexRouter';
import Error500 from './app/pages/error/Error500';
import { authRouter } from './app/routers/authRouter';

export const spinner = (
  <div className="progress-spinner text-center">
    <div className="swm-loader"></div>
  </div>
);

function App() {
  let router = useRoutes([
    { path: 'not-permission', element: <NotPermission /> }, //403
    { path: '/', element: <Navigate to="/dashboard" replace /> },
    authRouter,
    indexRouter,
    { path: 'err-network', element: <Error500 /> }, //500
    { path: '*', element: <NotFound /> }, //404
  ]);

  return (
    <div>
      <ToastContainer></ToastContainer>
      <Suspense fallback={spinner}>{router}</Suspense>
    </div>
  );
}

export default App;
