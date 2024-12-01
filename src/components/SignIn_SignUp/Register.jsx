import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const [inputs, setInputs] = useState({
    user_name: "",
    userId: "",
    user_password: "",
    cnic: "",
    org: "Insurance",
    affiliation: "insurance.customer",
    attributes: [{ name: "role", value: "user" }],
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "attributes") {
      // Handling for the attributes array
      setInputs({
        ...inputs,
        [name]: [{ name: "role", value: "user" }],
      });
    } else {
      setInputs({ ...inputs, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { user_name, userId, user_password } = inputs;
    if (!user_name || !userId || !user_password) {
      toast.error("Please fill in all fields.");
      return;
    }

    try {
      const { data } = await axios.post(
        "http://localhost:5000/client/registerUser",
        inputs,
        { headers: { "Content-Type": "application/json" } }
      );
      localStorage.setItem("token", data.token);
      toast.success("Registration successful!");

      const response = await axios.post(
        "http://localhost:5000/enroll/registerUser",
        inputs
      );
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
            <div className="card-header text-center">
              <h3 className="font-weight-light my-4">Register</h3>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="user_name">Full Name</label>
                  <input
                    type="text"
                    id="user_name"
                    name="user_name"
                    className="form-control"
                    placeholder="Enter Full Name"
                    value={inputs.user_name}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="user_name">CNIC</label>
                  <input
                    type="text"
                    id="cnic"
                    name="cnic"
                    className="form-control"
                    placeholder="Enter CNIC"
                    value={inputs.cnic}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="userId">Email</label>
                  <input
                    type="email"
                    id="userId"
                    name="userId"
                    className="form-control"
                    placeholder="Enter Email"
                    value={inputs.userId}
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
                      className="form-control"
                      placeholder="Set Password"
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
              </form>
            </div>
            <div className="card-footer text-center py-3">
              <small>
                Already have an account? <Link to="/login">Login here</Link>
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
