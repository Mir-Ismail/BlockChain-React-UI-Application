import React, { useState } from 'react';
import { Row, Col, Card, CardTitle, CardBody, Container, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import axios from 'axios';
import { toast } from 'react-toastify';

const Treatment = () => {
  const [data, setData] = useState({
    userId: '',
    treatment: '',
    amount: '',
  });

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/patient/submit', data);
      toast.success('Data saved successfully');
      console.log(response.data);
      setData({
        userId: '',
        treatment: '',
        amount: '',
      });
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.msg || 'An error occurred');
      } else {
        toast.error('Server Error');
      }
      console.error('Error submitting data:', error);
    }
  };

  return (
    <>
      <Row>
        <Col>
          <Card>
            <CardTitle tag="h6" className="border-bottom p-3 mb-0">
              <i className="bi bi-bell me-2"> </i>
              Patient Treatment Form
            </CardTitle>
            <CardBody>
              <Container fluid>
                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col md="6">
                      <FormGroup>
                        <Label>Insurance_Id</Label>
                        <Input
                          name="userId"
                          value={data.userId}
                          onChange={handleChange}
                          type="text"
                          placeholder="Insurance_Id"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="6">
                      <FormGroup>
                        <Label>Treatment</Label>
                        <Input
                          name="treatment"
                          value={data.treatment}
                          onChange={handleChange}
                          type="text"
                          placeholder="Treatment"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="6">
                      <FormGroup>
                        <Label>Treatment Cost</Label>
                        <Input
                          name="amount"
                          value={data.amount}
                          onChange={handleChange}
                          type="text"
                          placeholder="Amount in RS."
                        />
                      </FormGroup>
                    </Col>
                  </Row>

                  <Button
                    className="btn-fill pull-right"
                    type="submit"
                    variant="primary"
                  >
                    Submit
                  </Button>
                  <div className="clearfix"></div>
                </Form>
              </Container>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Treatment;
