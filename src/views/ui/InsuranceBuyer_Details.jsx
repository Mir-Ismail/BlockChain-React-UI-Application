import TablesBuyer from "./TablesBuyer";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Spinner, Row, Col, Card, CardBody } from 'reactstrap';
const InsuranceBuyer_Details = () => {

    const [buyers, setBuyers] = useState(null); 
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchBuyerData = async () => {
        try {
          const response = await axios.get("http://localhost:5000/insurance_buyer/alldata");
          console.log("API Response:", response.data);
          setBuyers(response.data);
        } catch (err) {
          console.error("Error fetching data:", err.message);
          setHospitals([]); 
        } finally {
          setLoading(false);
        }
      };
  
      fetchBuyerData();
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
  <TablesBuyer buyers={buyers}></TablesBuyer>
    </>
  )
}

export default InsuranceBuyer_Details