import { Outlet } from 'react-router-dom';
import { useAppSelector } from '../../store/hook';
import Dashboard from '../../pages/Dashboard';
import Header from './Header';
import Navbar from './Navbar';
import Footer from './Footer';

export default function Layout() {
  const spinner = useAppSelector((state) => state.spinner.loading);

  const backToTop = () => {
    window.scrollTo(0, 0);
  }
  return (
    <>
      {spinner && (
        <div className="progress-spinner text-center">
          <div className="swm-loader"></div>
        </div>
      )}
      {/* <main className="main" id="top">
        <div className="content">
          <Outlet />
        </div>
      </main> */}
      {/* <Header></Header> */}
      <Navbar></Navbar>
      <Outlet />
      <Footer></Footer>
      {/* <Dashboard></Dashboard> */}
      <a onClick={backToTop} className="pointer btn btn-primary py-3 fs-4 back-to-top"><i className="bi bi-arrow-up"></i></a>
    </>
  );
}
