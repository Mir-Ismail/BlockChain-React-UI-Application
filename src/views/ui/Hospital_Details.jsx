import React, { useEffect, useState } from "react";
import axios from "axios";
import Tables from './TablesBuyer';
import { Spinner, Row, Col, Card, CardBody } from 'reactstrap';
import TablesHospital from "./TablesHospital";

const Hospital_Details = () => {
  const [hospitals, setHospitals] = useState(null); 
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchHospitalData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/hospital/alldata");
        console.log("API Response:", response.data);
        setHospitals(response.data);
      } catch (err) {
        console.error("Error fetching data:", err.message);
        setHospitals([]); 
      } finally {
        setLoading(false);
      }
    };

    fetchHospitalData();
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
  
      <TablesHospital hospital={hospitals} ></TablesHospital>
    </>
  );
};

export default Hospital_Details;
