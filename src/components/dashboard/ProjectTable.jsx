import React, { useState, useEffect } from "react";
import { Card, CardBody, CardTitle, Table, Col } from "reactstrap";
import axios from "axios";
import "./dataTable.css";

const ProjectTables = () => {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      setError(null);

      const user_email = localStorage.getItem("user_email");
      if (!user_email) {
        setError("No email provided.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.post(
          "http://localhost:5000/auth/data",
          { user_email },
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        console.log("API Response:", response.data);

        const { users } = response.data;
        if (Array.isArray(users)) {
          setUserData(users);
        } else {
          console.error("Invalid data format received from the server.");
          setError("Invalid data format received from the server.");
        }
      } catch (err) {
        console.error("Error fetching data:", err.message);
        setError("Error fetching data: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div>
      <Col lg="12">
        <Card>
          <CardBody>
            <CardTitle tag="h5">Client Info</CardTitle>
            {loading ? (
              <div>Loading...</div>
            ) : error ? (
              <div className="text-danger">{error}</div>
            ) : (
              <Table className="no-wrap mt-3 align-middle" responsive borderless>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Email</th>
                    <th>Membership</th>
                  </tr>
                </thead>
                <tbody>
                  {userData.length > 0 ? (
                    userData.map((user, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{user.user_email}</td>
                        <td>{user.insuranceDetails?.membership || "N/A"}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="3" className="text-center">
                        No data available
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            )}
          </CardBody>
        </Card>
      </Col>
    </div>
  );
};

export default ProjectTables;
