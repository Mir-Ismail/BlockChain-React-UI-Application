import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = ({ setAuth }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [inputs, setInputs] = useState({
    cnic: "",
    user_password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/client/userlogin",
        inputs,
        { headers: { "Content-Type": "application/json" } }
      );

      const { token } = response.data;
      localStorage.setItem("token", token);

      const { org } = response.data;
      localStorage.setItem("org", org);

      setAuth(true);
      toast.success("Login successful!");
    } catch (err) {
      const errorMessage =
        err.response?.data || "An unexpected error occurred. Please try again.";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-6">
          <div className="card shadow-lg border-0 rounded-lg mt-5">
            <div className="card-header">
              <h3 className="text-center font-weight-light my-4">Login</h3>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="cnic">CNIC</label>
                  <input
                    type="text"
                    id="cnic"
                    name="cnic"
                    placeholder="Enter CNIC"
                    className="form-control"
                    value={inputs.cnic}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="user_password">Password</label>
                  <div className="input-group">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="user_password"
                      name="user_password"
                      placeholder="Enter Password"
                      className="form-control"
                      value={inputs.user_password}
                      onChange={handleChange}
                    />
                    <div className="input-group-append">
                      <button
                        className="btn btn-outline-secondary"
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                      >
                        {showPassword ? "Hide" : "Show"} Password
                      </button>
                    </div>
                  </div>
                </div>
                <button
                  type="submit"
                  className="btn btn-primary btn-block mt-4"
                >
                  Submit
                </button>
                <div>
                  <Link
                    to="/enrollAdmin"
                    className="btn btn-primary btn-block mt-4 white"
                  >
                    Enroll Admin
                  </Link>
                  <Link
                    to="/register"
                    className="btn btn-primary btn-block mt-4"
                  >
                    Register User
                  </Link>
                </div>
              </form>
            </div>
            <div className="card-footer text-center py-3">
              <small>
                Don't have an account? <Link to="/register">Register here</Link>
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
