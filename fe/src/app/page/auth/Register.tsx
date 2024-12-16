import React, { useEffect, useState } from "react";
import { RegisterRequest } from "../../model/RegisterRequest";
import { useNavigate } from "react-router-dom";
import { AuthService } from "../../service/AuthService";
import { toast } from "react-toastify";

export default function Register() {
  const [model, setModel] = useState(
    new RegisterRequest("", "", "", "", "", "")
  );
  const navigate = useNavigate();

  const changeInput = (data: any) => {
    const value = data.target.value;
    const name = data.target.name;
    setModel({
      ...model,
      [name]: value,
    });
  };

  const handleSave = () => {
    AuthService.getInstance()
      .register(model)
      .then((res) => {
        console.log(res);
        toast.success('Đăng ký thành công');
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <>
      <main>
        <div className="container">
          <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">
                  <div className="d-flex justify-content-center py-4">
                    <a
                      href="index.html"
                      className="logo d-flex align-items-center w-auto"
                    >
                      <img src="/assets/img/logo-heaven.svg" alt="" />
                      <span
                        className="fw-bold d-none d-lg-block"
                        style={{ color: "#EF8121" }}
                      >
                        Heaven
                      </span>
                      <span className="fw-bold d-none d-lg-block">Shop</span>
                    </a>
                  </div>
                  <div className="card mb-3">
                    <div className="card-body">
                      <div className="pt-2 pb-2">
                        <h5 className="card-title text-center pb-0 fs-4">
                          Create an Account
                        </h5>
                      </div>

                      <div className="row g-3 needs-validation">
                        <div className="col-12">
                          <label className="form-label">Fullname</label>
                          <input
                            onChange={changeInput}
                            type="text"
                            name="fullName"
                            className="form-control"
                            id="fullName"
                          />
                          <div className="invalid-feedback">
                            Please, enter your name!
                          </div>
                        </div>

                        <div className="col-12">
                          <label className="form-label">Your Email</label>
                          <input
                            onChange={changeInput}
                            type="email"
                            name="email"
                            className="form-control"
                            id="yourEmail"
                          />
                          <div className="invalid-feedback">
                            Please enter a valid Email adddress!
                          </div>
                        </div>

                        <div className="col-12">
                          <label className="form-label">Username</label>
                          <input
                            onChange={changeInput}
                            type="text"
                            name="username"
                            className="form-control"
                            id="yourUsername"
                          />
                          <div className="invalid-feedback">
                            Please choose a username.
                          </div>
                        </div>

                        <div className="col-12">
                          {/* <label className="form-label">Password</label>
                          <input
                          onChange={changeInput}
                            type="password"
                            name="password"
                            className="form-control"
                            id="yourPassword"
                          />
                          <div className="invalid-feedback">
                            Please enter your password!
                          </div> */}
                          <label className="form-label">Password</label>
                          <div className="input-group has-validation">
                            <input
                              onChange={changeInput}
                              type="password"
                              name="password"
                              className="form-control"
                              id="password"
                            />
                            <a
                              className="pointer input-group-text"
                              id="inputGroupPrepend"
                            >
                              <i className="bi bi-eye"></i>
                            </a>
                            <div className="invalid-feedback">
                              Please choose a username.
                            </div>
                          </div>
                        </div>

                        <div className="col-12">
                          <label className="form-label">Phone Number</label>
                          <input
                            onChange={changeInput}
                            type="text"
                            name="phoneNumber"
                            className="form-control"
                            id="phoneNumber"
                          />
                          <div className="invalid-feedback">
                            Please enter your phone!
                          </div>
                        </div>

                        <div className="col-12">
                          <label className="form-label">Address</label>
                          <input
                            onChange={changeInput}
                            type="text"
                            name="address"
                            className="form-control"
                            id="address"
                          />
                          <div className="invalid-feedback">
                            Please enter your address!
                          </div>
                        </div>
                        <div className="col-12">
                          <button
                            onClick={handleSave}
                            className="btn btn-primary w-100"
                          >
                            Create Account
                          </button>
                        </div>
                        <div className="col-12">
                          <p className="small mb-0">
                            Already have an account?{" "}
                            <a
                              onClick={() => {
                                navigate("/login");
                              }}
                              className="pointer"
                            >
                              Log in
                            </a>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
