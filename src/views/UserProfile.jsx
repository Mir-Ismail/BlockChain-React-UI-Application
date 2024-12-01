import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { Button, Card, Form, Container, Row, Col } from "react-bootstrap";

function UserProfile() {
  const location = useLocation();
  const { title } = location.state || {};

  const [data, setData] = useState({
    membership: title || "", 
    user_email: "",
    username: "",
    firstName: "",
    lastName: "",
    age: "",
    dob: "",
    gender: "",
    phoneNumber: "",
    address: "",
    city: "",
    country: "",
    postalCode: "",
    idType: "",
    idNumber: "",
    idExpiryDate: "",
    height: "",
    weight: "",
    currentMedications: "",
    picture: null,
    governmentId: null,
    proofOfAddress: null,
    medicalRecords: null,
  });

  useEffect(() => {
    setData((prevData) => ({
      ...prevData,
      membership: title || prevData.membership,
    }));
  }, [title]);

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
    formData.append("membership", data.membership);
    formData.append("user_name", data.username);
    formData.append("user_email", data.user_email);
    formData.append("first_name", data.firstName);
    formData.append("last_name", data.lastName);
    formData.append("user_age", data.age);
    formData.append("date_of_birth", data.dob);
    formData.append("gender", data.gender);
    formData.append("phone_number", data.phoneNumber);
    formData.append("user_address", data.address);
    formData.append("city", data.city);
    formData.append("country", data.country);
    formData.append("postal_code", data.postalCode);
    formData.append("id_type", data.idType);
    formData.append("id_number", data.idNumber);
    formData.append("id_expiry_date", data.idExpiryDate);
    formData.append("user_height", data.height);
    formData.append("user_weight", data.weight);
    formData.append("current_medication", data.currentMedications);
    formData.append("picture", data.picture);
    formData.append("governmentId", data.governmentId);
    formData.append("proofOfAddress", data.proofOfAddress);
    formData.append("medicalRecords", data.medicalRecords);

    try {
      // Log the formData entries
      for (let pair of formData.entries()) {
        console.log(pair[0], pair[1]);
      }

      const res = await axios.post("http://localhost:5000/insurance_buyer/add", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.status === 201) {
        console.log('User data added successfully');
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Edit Profile</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form onSubmit={addUserData}>
                  <Row>
                    <Col className="pr-1" md="5">
                      <Form.Group>
                        <label>Owned</label>
                        <Form.Control
                          value={data.membership}
                          name="membership"
                          disabled
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="px-1" md="3">
                      <Form.Group>
                        <label>Username</label>
                        <Form.Control
                          value={data.username}
                          name="username"
                          onChange={handleChange}
                          placeholder="Username"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="4">
  <Form.Group>
    <label htmlFor="exampleInputEmail1">Email address</label>
    <Form.Control
      value={data.user_email}
      name="user_email"
      onChange={handleChange} 
      placeholder="Email"
      type="email"
    ></Form.Control>
  </Form.Group>
</Col>

                  </Row>
                  <Row>
                    <Col className="pr-1" md="4">
                      <Form.Group>
                        <label>First Name</label>
                        <Form.Control
                          value={data.firstName}
                          name="firstName"
                          onChange={handleChange}
                          placeholder="First Name"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="4">
                      <Form.Group>
                        <label>Last Name</label>
                        <Form.Control
                          value={data.lastName}
                          name="lastName"
                          onChange={handleChange}
                          placeholder="Last Name"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="4">
                      <Form.Group>
                        <label>Age</label>
                        <Form.Control
                          value={data.age}
                          name="age"
                          onChange={handleChange}
                          type="number"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="4">
                      <Form.Group>
                        <label>Date of Birth</label>
                        <Form.Control
                          value={data.dob}
                          name="dob"
                          onChange={handleChange}
                          placeholder="Date of Birth"
                          type="date"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="px-1" md="4">
                      <Form.Group>
                        <label>Gender</label>
                        <Form.Control
                          value={data.gender}
                          name="gender"
                          onChange={handleChange}
                          as="select"
                        >
                          <option>Male</option>
                          <option>Female</option>
                          <option>Other</option>
                        </Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="4">
                      <Form.Group>
                        <label>Phone Number</label>
                        <Form.Control
                          value={data.phoneNumber}
                          name="phoneNumber"
                          onChange={handleChange}
                          placeholder="Phone Number"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <Form.Group>
                        <label>Address</label>
                        <Form.Control
                          value={data.address}
                          name="address"
                          onChange={handleChange}
                          placeholder="Home Address"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="4">
                      <Form.Group>
                        <label>City</label>
                        <Form.Control
                          value={data.city}
                          name="city"
                          onChange={handleChange}
                          placeholder="City"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="px-1" md="4">
                      <Form.Group>
                        <label>Country</label>
                        <Form.Control
                          value={data.country}
                          name="country"
                          onChange={handleChange}
                          placeholder="Country"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="4">
                      <Form.Group>
                        <label>Postal Code</label>
                        <Form.Control
                          value={data.postalCode}
                          name="postalCode"
                          onChange={handleChange}
                          placeholder="ZIP Code"
                          type="number"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="4">
                      <Form.Group>
                        <label>ID Type</label>
                        <Form.Control
                          value={data.idType}
                          name="idType"
                          onChange={handleChange}
                          as="select"
                        >
                          <option>Passport</option>
                          <option>National ID</option>
                        </Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="px-1" md="4">
                      <Form.Group>
                        <label>ID Number</label>
                        <Form.Control
                          value={data.idNumber}
                          name="idNumber"
                          onChange={handleChange}
                          placeholder="ID Number"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="4">
                      <Form.Group>
                        <label>ID Expiry Date</label>
                        <Form.Control
                          value={data.idExpiryDate}
                          name="idExpiryDate"
                          onChange={handleChange}
                          placeholder="Date"
                          type="date"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="6">
                      <Form.Group>
                        <label>Height</label>
                        <Form.Control
                          value={data.height}
                          name="height"
                          onChange={handleChange}
                          placeholder="cm"
                          type="number"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="6">
                      <Form.Group>
                        <label>Weight</label>
                        <Form.Control
                          value={data.weight}
                          name="weight"
                          onChange={handleChange}
                          placeholder="kg"
                          type="number"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <Form.Group>
                        <label>Current Medications</label>
                        <Form.Control
                          value={data.currentMedications}
                          name="currentMedications"
                          onChange={handleChange}
                          placeholder="Med."
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <Form.Group>
                        <label>Upload Picture</label>
                        <Form.Control
                          name="picture"
                          onChange={handleChange}
                          type="file"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <Form.Group>
                        <label>Upload Government-issued ID</label>
                        <Form.Control
                          name="governmentId"
                          onChange={handleChange}
                          type="file"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <Form.Group>
                        <label>Upload Proof of Address (Electricity Bill)</label>
                        <Form.Control
                          name="proofOfAddress"
                          onChange={handleChange}
                          type="file"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <Form.Group>
                        <label>Upload Medical Records</label>
                        <Form.Control
                          name="medicalRecords"
                          onChange={handleChange}
                          type="file"
                        ></Form.Control>
                      </Form.Group>
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
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default UserProfile;
