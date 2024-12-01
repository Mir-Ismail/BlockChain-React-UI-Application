import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./components/SignIn_SignUp/Login";
import Register from "./components/SignIn_SignUp/Register";
import Loader from "./layouts/loader/Loader";
import DataTable from "./components/DataTabe";
import RegisterUser from "./components/SignIn_SignUp/RegisterUser";
import EnrolAdmin from "./components/SignIn_SignUp/EnrollAdmin";
import MultiStepForm from "./components/MultiStepForm";
import Hospital from "./views/Hospital";
import Update from "./components/Update";
import { Row, Col } from "reactstrap";
import FullLaoyout from "./layouts/FullLayout";
import Treatment from "./views/ui/treatment";
import Starter from "./views/Starter";
import Treatmentdetails from "./views/ui/Treatmentdetails";
import MultiStepPlan from "./components/Payment/MultiStepPlan";
import PlanDetail from "./components/Payment/PlanDetail";
import HosReg from "./components/Hospital/HosReg";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const org = localStorage.getItem("org");
  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  };

  const isAuth = async () => {
    try {
      const response = await axios.get("http://localhost:5000/auth/is-verify", {
        headers: { token: localStorage.getItem("token") },
      });

      const parseRes = Boolean(response.data);
      setIsAuthenticated(parseRes);
    } catch (err) {
      console.error(err.message);
      setIsAuthenticated(false); // Ensure user is logged out on error
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    isAuth(); // Verify if the user should be authenticated
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="fluid-container">
      <ToastContainer />

      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <>
                {org === "Insurance" ? (
                  <FullLaoyout setAuth={setAuth} role={org} />
                ) : org === "Hospital" ? (
                  <Hospital setAuth={setAuth} />
                ) : (
                  <p>No organization found</p>
                )}
              </>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        <Route
          path="/login"
          element={
            isAuthenticated ? (
              <Navigate to="/" replace />
            ) : (
              <Login setAuth={setAuth} />
            )
          }
        />
        <Route
          path="/register"
          element={
            isAuthenticated ? (
              <Navigate to="/" replace />
            ) : (
              <Register setAuth={setAuth} />
            )
          }
        />
        <Route path="/" element={<FullLaoyout setAuth={setAuth} role={org} />}>
          <Route path="/registeruser" element={<RegisterUser />} />
          <Route path="/enrollAdmin" element={<EnrolAdmin />} />
          <Route path="/treatment" element={<Treatment />} />
          <Route path="/starter" element={<Starter role={org} />} />
          <Route path="/hospital" element={<Hospital />} />
          <Route path="/update/:id?" element={<Update />} />
          <Route path="/data" element={<DataTable />} />
          <Route path="/forms" element={<MultiStepForm />} />
          <Route path="/tdetails" element={<Treatmentdetails />} />
          <Route path="/plan" element={<MultiStepPlan />} />
          <Route path="/plandetail" element={<PlanDetail />} />
          <Route path="/hospitalform" element={<HosReg />} />
        </Route>
        <Route
          path="*"
          element={<Navigate to={isAuthenticated ? "/" : "/login"} replace />}
        />
      </Routes>
    </div>
  );
};

export default App;
