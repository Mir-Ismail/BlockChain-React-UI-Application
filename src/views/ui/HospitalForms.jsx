import React, { useState } from "react";
import axios from "axios";
import {
  Card,
  Row,
  Col,
  CardTitle,
  CardBody,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Container,
} from "reactstrap";

const HospitalForms = () => {
  const [data, setData] = useState({
    hospital_name: "",
    registrationNumber: "",
    hospital_type: "",
    hospital_address: "",
    phone_number: "",
    email: "",
    admin_name: "",
    admin_phone: "",
    admin_email: "",
    beds: 0,
    specialties: "",
    registration_certificate: null,
    license_to_operate: null,
    proof_of_address: null,
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    const newValue = type === "file" ? files[0] : value;
    setData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));
  };

  const addUserData = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("hospital_name", data.hospital_name);
    formData.append("registrationNumber", data.registrationNumber); // Corrected key
    formData.append("hospital_type", data.hospital_type);
    formData.append("hospital_address", data.hospital_address);
    formData.append("phone_number", data.phone_number);
    formData.append("email", data.email);
    formData.append("admin_name", data.admin_name);
    formData.append("admin_phone", data.admin_phone); // Corrected key
    formData.append("admin_email", data.admin_email);
    formData.append("beds", data.beds);
    formData.append("specialties", data.specialties);
    formData.append("registration_certificate", data.registration_certificate);
    formData.append("license_to_operate", data.license_to_operate);
    formData.append("proof_of_address", data.proof_of_address);

    try {
      for (let pair of formData.entries()) {
        console.log(pair[0], pair[1]);
      }

      const res = await axios.post("http://localhost:5000/hospital/add", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.status === 201) {
        console.log("User data added successfully");
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Row>
      <Col>
        <Card>
          <CardTitle tag="h6" className="border-bottom p-3 mb-0">
            <i className="bi bi-bell me-2"></i>
            Hospital Registration Form
          </CardTitle>
          <CardBody>
            <Container fluid>
              <Form onSubmit={addUserData}>
                <Row>
                  <Col md="6">
                    <FormGroup>
                      <Label>Hospital Name</Label>
                      <Input
                        name="hospital_name"
                        value={data.hospital_name}
                        onChange={handleChange}
                        type="text"
                        placeholder="Hospital Name"
                      />
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <Label>Registration Number</Label>
                      <Input
                        name="registrationNumber" // Corrected key
                        value={data.registrationNumber}
                        onChange={handleChange}
                        type="text"
                        placeholder="Registration Number"
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md="6">
                    <FormGroup>
                      <Label>Hospital Type</Label>
                      <Input
                        name="hospital_type"
                        value={data.hospital_type}
                        onChange={handleChange}
                        type="text"
                        placeholder="Hospital Type"
                      />
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <Label>Hospital Address</Label>
                      <Input
                        name="hospital_address"
                        value={data.hospital_address}
                        onChange={handleChange}
                        type="text"
                        placeholder="Hospital Address"
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md="6">
                    <FormGroup>
                      <Label>Phone Number</Label>
                      <Input
                        name="phone_number"
                        value={data.phone_number}
                        onChange={handleChange}
                        type="tel"
                        placeholder="Hospital Phone Number"
                      />
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <Label>Email</Label>
                      <Input
                        name="email"
                        value={data.email}
                        onChange={handleChange}
                        type="email"
                        placeholder="Hospital Email"
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md="6">
                    <FormGroup>
                      <Label>Admin Name</Label>
                      <Input
                        name="admin_name"
                        value={data.admin_name}
                        onChange={handleChange}
                        type="text"
                        placeholder="Admin Name"
                      />
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <Label>Admin Phone</Label>
                      <Input
                        name="admin_phone" // Corrected key
                        value={data.admin_phone}
                        onChange={handleChange}
                        type="tel"
                        placeholder="Admin Phone Number"
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md="6">
                    <FormGroup>
                      <Label>Admin Email</Label>
                      <Input
                        name="admin_email"
                        value={data.admin_email}
                        onChange={handleChange}
                        type="email"
                        placeholder="Admin Email"
                      />
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <Label>Beds</Label>
                      <Input
                        name="beds"
                        value={data.beds}
                        onChange={handleChange}
                        type="number"
                        placeholder="Number of Beds"
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md="6">
                    <FormGroup>
                      <Label>Specialties</Label>
                      <Input
                        name="specialties"
                        value={data.specialties}
                        onChange={handleChange}
                        type="text"
                        placeholder="Specialties"
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md="6">
                    <FormGroup>
                      <Label>Registration Certificate</Label>
                      <Input
                        name="registration_certificate"
                        onChange={handleChange}
                        type="file"
                      />
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <Label>License to Operate</Label>
                      <Input
                        name="license_to_operate"
                        onChange={handleChange}
                        type="file"
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md="6">
                    <FormGroup>
                      <Label>Proof of Address (Electricity Bill)</Label>
                      <Input
                        name="proof_of_address"
                        onChange={handleChange}
                        type="file"
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Button className="btn-fill pull-right" type="submit" variant="primary">
                  Submit
                </Button>
                <div className="clearfix"></div>
              </Form>
            </Container>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

export default HospitalForms;
