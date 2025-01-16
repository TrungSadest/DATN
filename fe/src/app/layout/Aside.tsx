import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Aside() {

    const navigate = useNavigate();

  return (
    <aside id="sidebar" className="sidebar">

    <ul className="sidebar-nav" id="sidebar-nav">

      <li className="nav-item">
        <a className="pointer nav-link" onClick={()=>{navigate('dashboard')}}>
          <i className="bi bi-grid"></i>
          <span>Dashboard</span>
        </a>
      </li>
      {/* <!-- End Dashboard Nav --> */}

      <li className="nav-item">
        <a className="pointer nav-link collapsed" onClick={()=>{navigate('category')}}>
          <i className="bi bi-menu-button-wide"></i><span>Category</span>
        </a>       
      </li>
      {/* <!-- End Components Nav --> */}

      <li className="nav-item">
        <a className="pointer nav-link collapsed" onClick={()=>{navigate('product')}}>
          <i className="bi bi-menu-button-wide"></i><span>Product</span>
        </a>       
      </li>

      <li className="nav-item">
        <a className="pointer nav-link collapsed" onClick={()=>{navigate('order')}}>
          <i className="bi bi-menu-button-wide"></i><span>Order</span>
        </a>       
      </li>
       <li className="nav-item">
        <a className="nav-link collapsed" onClick={()=>{navigate('register')}}>
          <i className="bi bi-card-list"></i>
          <span>Register</span>
        </a>
      </li> 


      <li className="nav-item">
        <a className="nav-link collapsed" onClick={()=>{navigate('login')}}>
          <i className="bi bi-box-arrow-in-right"></i>
          <span>Login</span>
        </a>
      </li>
      {/* <!-- End Login Page Nav --> */} 

      {/* <li className="nav-item">
        <a className="nav-link collapsed" href="pages-error-404.html">
          <i className="bi bi-dash-circle"></i>
          <span>Error 404</span>
        </a>
      </li> */}
      {/* <!-- End Error 404 Page Nav --> */}

      {/* <li className="nav-item">
        <a className="nav-link collapsed" href="pages-blank.html">
          <i className="bi bi-file-earmark"></i>
          <span>Blank</span>
        </a>
      </li> */}
      {/* <!-- End Blank Page Nav --> */}

    </ul>

  </aside>
  )
}
