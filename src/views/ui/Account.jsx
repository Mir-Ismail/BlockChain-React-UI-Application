import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaClipboard } from "react-icons/fa";
import { Button, Alert } from "reactstrap";
import ProjectTables from '../../components/dashboard/ProjectTable';
import "./Account.css";

const Account = () => {
  const [id, setId] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(id);
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 2000); // Hide popup after 2 seconds
  };

  const getId = async () => {
    try {
      const user_email = localStorage.getItem("user_email");
      const response = await axios.post("http://localhost:5000/insurance_buyer/data", {
        user_email: user_email
      });
      
      console.log("API Response:", response.data);
      const parseres = response.data;
      setId(parseres.user_id);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getId();
  }, []);

  return (
    <>
      <Button className="id-button" color="primary" onClick={copyToClipboard}>
        {id.slice(0, 5)}...
        <FaClipboard className="clipboard-icon" />
      </Button>
      <Alert color="success" isOpen={showPopup} className="popup">
        <span className="popup-text">Roger that!</span>
      </Alert>
     <ProjectTables />
    </>
  );
};

export default Account;
