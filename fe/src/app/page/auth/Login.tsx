import React from "react";

export default function Login() {
  return (
    <>
      <div className="container">
        <div className="d-flex flex-column align-items-center justify-content-center min-vh-100">
          <h1>Heaven Shop</h1>
          <div style={{ width: "430px" }} className="card p-2">
            <div className="card-body">
              <div className="mb-3 text-center">
                <h3 className="card-title text-center pb-0 fs-4">
                  Login to Your Account
                </h3>
                <span className="small">
                  Enter your username & password to login
                </span>
              </div>
              <div className="mb-3">
                <label htmlFor="">Username</label>
                <input className="form-control" type="text" />
              </div>
              <div className="mb-3">
                <label htmlFor="">Password</label>
                <input
                  className="form-control"
                  type="password"
                  name="password"
                  id="password"
                />
              </div>
              <div className="mb-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="rememberMe"
                  id="rememberMe"
                />
                <label className="ms-2 form-check-label" htmlFor="">
                  Remember me
                </label>
              </div>
              <div className="mb-3">
                <button className="w-100 btn btn-primary">Login</button>
              </div>
              <div>
                <span className="me-2">Don't have account?</span>
                <a href="">Create an account</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
