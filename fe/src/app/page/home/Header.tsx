import React from "react";
import { useNavigate } from "react-router-dom";
import { AuthConstant } from "../../constant/authConstant";
import Cookies from "universal-cookie";

export default function Header() {
  const cookie = new Cookies();
  const token = cookie.get(AuthConstant.ACCESS_TOKEN);
  const navigate = useNavigate();
  console.log(token);
  return (
    <header>
      <div className="nav">
        <div className="container-fluid">
          <nav className="navbar navbar-expand-md bg-dark navbar-dark">
            <a href="#" className="navbar-brand">
              MENU
            </a>
            <button
              type="button"
              className="navbar-toggler"
              data-toggle="collapse"
              data-target="#navbarCollapse"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div
              className="collapse navbar-collapse justify-content-between"
              id="navbarCollapse"
            >
              <div className="navbar-nav mr-auto pointer">
                <a
                  onClick={() => {
                    navigate("");
                  }}
                  className="nav-item nav-link active"
                >
                  Home
                </a>
                <a
                  onClick={() => {
                    navigate("product");
                  }}
                  className="nav-item nav-link"
                >
                  Products
                </a>
                <a href="#" className="nav-item nav-link">
                  Product Detail
                </a>
                <a href="#" className="nav-item nav-link">
                  Cart
                </a>
                <a href="#" className="nav-item nav-link">
                  Checkout
                </a>
                <a href="#" className="nav-item nav-link">
                  My Account
                </a>
                <div className="nav-item dropdown">
                  <a
                    href="#"
                    className="nav-link dropdown-toggle"
                    data-toggle="dropdown"
                    aria-expanded="false"
                  >
                    More Pages
                  </a>
                  <div className="dropdown-menu">
                    <a href="#" className="dropdown-item">
                      Wishlist
                    </a>
                    <a href="#" className="dropdown-item">
                      Login &amp; Register
                    </a>
                    <a href="#" className="dropdown-item">
                      Contact Us
                    </a>
                  </div>
                </div>
              </div>
              <div className="navbar-nav ml-auto">
                <div className="nav-item dropdown">
                  <a
                    href="#"
                    className="nav-link dropdown-toggle"
                    data-toggle="dropdown"
                    aria-expanded="false"
                  >
                    User Account
                  </a>
                  <div className="dropdown-menu">
                    <a href="#" className="dropdown-item">
                      Login
                    </a>
                    <a href="#" className="dropdown-item">
                      Register
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </div>
      <div className="bottom-bar">
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col-md-3">
              <div className="d-flex align-items-center justify-content-between">
                <a className="pointer logo d-flex align-items-center">
                  <img src="assets/img/logo-heaven.svg" alt="" />
                  <span
                    className="fw-bold d-none d-lg-block"
                    style={{ color: "#EF8121" }}
                  >
                    Heaven
                  </span>
                  <span className="fw-bold d-none d-lg-block">Shop</span>
                </a>
              </div>
            </div>
            <div className="col-md-6">
              <div className="search">
                <input type="text" placeholder="search" />
                <button>
                  <i className="pi pi-search"></i>
                </button>
              </div>
            </div>
            <div className="col-md-3">
              <div className="user">
                <a href="cart.html" className="btn cart" id="uniqueButton">
                  <i className="pi pi-shopping-cart"></i>
                  <span>(0)</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
