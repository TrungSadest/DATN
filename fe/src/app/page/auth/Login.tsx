import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginRequest } from "../../model/LoginRequest";
import { AuthService } from "../../service/AuthService";
import { toast } from "react-toastify";
import { HttpStatusCode } from "axios";
import { Constant } from "../../constant/constant";
import Cookies from "universal-cookie";
import { AuthConstant } from "../../constant/authConstant";
import { useAppSelector } from "../../store/hook";
import { RootState } from "../../store/store";

export default function Login() {
  const navigate = useNavigate();
  const cookie = new Cookies();
  const isLogin = useAppSelector((state: RootState) => state.user.isLogin);
  const [model, setModel] = useState(new LoginRequest("", ""));

  useEffect(()=>{
    console.log(isLogin);
    if (isLogin && isLogin === true) {
      navigate('/');
    }
  },[isLogin, navigate])

  const changeInput = (data: any) => {
    const value = data.target.value;
    const name = data.target.name;
    setModel({
      ...model,
      [name]: value,
    });
  };
  const handleLogin = () => {
    AuthService.getInstance().login(model).then(res=>{
      if (res && res.status === HttpStatusCode.Ok && res.data.status === true && res.data.responseData) {
        const _token = res.data.responseData;
        toast.success("Đăng nhập thành công");
        const expires = new Date();
        expires.setDate(expires.getDate() + AuthConstant.EXPIRES_TOKEN)
        cookie.remove(AuthConstant.ACCESS_TOKEN);
        cookie.set(AuthConstant.ACCESS_TOKEN, _token, { path: '/', expires: expires })
        navigate('/');
      }else{
        toast.warn("Tài khoản hoặc mật khẩu không đúng")
      }
    }).catch(e=>{
      toast.error("Lỗi hệ thống");
    })
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
                      <div className="pt-4 pb-2">
                        <h5 className="card-title text-center pb-0 fs-4">
                          Login to Your Account
                        </h5>
                        <p className="text-center small">
                          Enter your username & password to login
                        </p>
                      </div>

                      <div className="row g-3 needs-validation">
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
                            Please enter your username.
                          </div>
                        </div>

                        <div className="col-12">
                          <label className="form-label">Password</label>
                          <input
                            onChange={changeInput}
                            type="password"
                            name="password"
                            className="form-control"
                            id="yourPassword"
                          />
                          <div className="invalid-feedback">
                            Please enter your password!
                          </div>
                        </div>

                        <div className="col-12">
                          <div className="form-check">
                            <input
                              className="pointer form-check-input"
                              type="checkbox"
                              name="remember"
                              value="true"
                              id="rememberMe"
                            />
                            <label className="form-check-label">
                              Remember me
                            </label>
                          </div>
                        </div>
                        <div className="col-12">
                          <button
                            onClick={handleLogin}
                            className="btn btn-primary w-100"
                          >
                            Login
                          </button>
                        </div>
                        <div className="col-12">
                          <p className="small mb-0">
                            Don't have account?{" "}
                            <a
                              onClick={() => {
                                navigate("/register");
                              }}
                              className="pointer"
                            >
                              Create an account
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
