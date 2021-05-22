import React from "react";
import "./LoginScreen.css";

const LoginScreen = () => {
  return (
    <div className="container login-container">
      <div className="row">
        <div className="col-md-6 login-form-1">
          <h3>Login</h3>
          <form>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                name="email"
                placeholder="Email"
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                name="password"
                placeholder="Password"
              />
            </div>
            <div className="form-group">
              <input type="submit" className="btnSubmit" value="Login" />
            </div>
          </form>
        </div>

        <div className="col-md-6 login-form-2">
          <h3>Register</h3>
          <form>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                name="register-name"
                placeholder="Name"
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                className="form-control"
                name="register-email"
                placeholder="Email"
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                name="register-password"
                placeholder="Password"
              />
            </div>

            <div className="form-group">
              <input
                type="password"
                className="form-control"
                name="register-password-repeated"
                placeholder="Confirm password"
              />
            </div>

            <div className="form-group">
              <input
                type="submit"
                className="btnSubmit"
                value="Create Account"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
