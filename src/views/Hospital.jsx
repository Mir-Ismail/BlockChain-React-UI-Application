import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const Hospital = ({ setAuth }) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    // localStorage.removeItem("org");
    setAuth(false);
    toast.dark("Logout Successfully");
    navigate("/login");
  };
  return (
    <div>
      {" "}
      <button className="btn btn-danger" onClick={handleLogout}>
        Logout
      </button>
      <div>Welocome to The Hospital Dashboard</div>
    </div>
  );
};

export default Hospital;
