import React, { useEffect, useState } from "react";
import axios from "axios";
import { Spinner, Row, Col, Card, CardBody, CardTitle, Table } from 'reactstrap';

const Treatmentdetails = () => {
  const [treatment, setTreatment] = useState([]); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTreatmentData = async () => {
      try {
        let response;
        const userRole = localStorage.getItem("user_role");
        const userEmail = localStorage.getItem("user_email");
        
        if (userRole === "User") {
          response = await axios.post("http://localhost:5000/patient/data", {
            email: userEmail
          });
          console.log("API Response for User:", response.data);
          setTreatment(response.data);
        } else {
          response = await axios.get("http://localhost:5000/patient/alldata");
          console.log("API Response for Non-User:", response.data);
          setTreatment(response.data || []);
        }
      } catch (err) {
        console.error("Error fetching data:", err.message);
        setTreatment([]); 
      } finally {
        setLoading(false);
      }
    };

    fetchTreatmentData();
  }, []);

  if (loading) {
    return (
      <Row>
        <Col lg="12">
          <Card>
            <CardBody className="text-center">
              <Spinner color="primary" />
              <div>Loading data...</div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    );
  }

  return (
    <>
      <Row>
        <Col lg="12">
          <Card>
            <CardTitle tag="h6" className="border-bottom p-3 mb-0">
              <i className="bi bi-card-text me-2"></i> Treatment Details
            </CardTitle>
            <CardBody>
              <Table bordered>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>ID</th>
                    <th>Treatment</th>
                    <th>Amount</th>
                    <th>Issue Date</th>
                  </tr>
                </thead>
                <tbody>
                  {treatment.length > 0 ? (
                    treatment.map((item, index) => (
                      <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <td>{item.userId}</td>
                        <td>{item.treatment}</td>
                        <td>{item.amount}</td>
                        <td>{item.issueDate}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5">No data available</td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default Treatmentdetails;
