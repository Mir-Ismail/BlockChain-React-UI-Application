import React, { useState } from "react";
import axios from "axios";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Alert,
  Row,
  Col,
  Container,
  Card,
  CardBody,
} from "reactstrap";
import { FaUser, FaEnvelope, FaLock, FaPlus, FaTrashAlt } from "react-icons/fa"; // Importing icons
import "./RegisterUser.css"; // Import custom CSS file

const RegisterUser = () => {
  const [org, setOrg] = useState("");
  const [cnic, setcnic] = useState("");
  const [userId, setUserId] = useState("");
  const [affiliation, setAffiliation] = useState("");
  const [user_name, setUsername] = useState("");
  const [user_password, setUserpassword] = useState("");
  const [attributes, setAttributes] = useState([
    { name: "", value: "", ecert: true },
  ]);
  const [message, setMessage] = useState("");

  const handleAddAttribute = () => {
    setAttributes([...attributes, { name: "", value: "", ecert: true }]);
  };

  const handleAttributeChange = (index, event) => {
    const { name, value } = event.target;
    const newAttributes = [...attributes];
    newAttributes[index][name] = value;
    setAttributes(newAttributes);
  };

  const handleRegisterUser = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/enroll/registerUser",
        {
          org,
          userId,
          cnic,
          affiliation,
          attributes,
          user_name,
          user_password,
        }
      );
      const response2 = await axios.post(
        "http://localhost:5000/client/registerUser",
        {
          org,
          userId,
          cnic,
          affiliation,
          attributes,
          user_name,
          user_password,
        }
      );

      setMessage(
        typeof response2.data === "string"
          ? response2.data
          : JSON.stringify(response2.data)
      );
    } catch (error) {
      setMessage(
        `Error: ${error.response ? error.response.data : error.message}`
      );
    }
  };

  return (
    <Container className="my-4">
      <Card>
        <CardBody>
          <h2 className="text-center mb-4">Register User</h2>
          <Form>
            <FormGroup>
              <Label for="org">Organization</Label>
              <Input
                type="text"
                name="org"
                id="org"
                value={org}
                onChange={(e) => setOrg(e.target.value)}
                placeholder="Organization (Insurance or Hospital)"
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="userId">Email</Label>
              <Input
                type="email"
                name="userId"
                id="userId"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                placeholder="Email"
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="cnic">CNIC</Label>
              <Input
                type="text"
                name="cnic"
                id="cnic"
                value={cnic}
                onChange={(e) => setcnic(e.target.value)}
                placeholder="CNIC"
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="affiliation">Affiliation</Label>
              <Input
                type="text"
                name="affiliation"
                id="affiliation"
                value={affiliation}
                onChange={(e) => setAffiliation(e.target.value)}
                placeholder="Affiliation"
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="user_name">Username</Label>
              <Input
                type="text"
                name="user_name"
                id="user_name"
                value={user_name}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="user_password">Password</Label>
              <Input
                type="password"
                name="user_password"
                id="user_password"
                value={user_password}
                onChange={(e) => setUserpassword(e.target.value)}
                placeholder="Password"
                required
              />
            </FormGroup>

            <h3 className="mt-4">Attributes</h3>
            {attributes.map((attribute, index) => (
              <Row key={index} className="mb-3">
                <Col md={4}>
                  <FormGroup>
                    <Label for={`name-${index}`}>Attribute Name</Label>
                    <Input
                      type="text"
                      name="name"
                      id={`name-${index}`}
                      value={attribute.name}
                      onChange={(e) => handleAttributeChange(index, e)}
                      placeholder="Attribute Name"
                      required
                    />
                  </FormGroup>
                </Col>
                <Col md={4}>
                  <FormGroup>
                    <Label for={`value-${index}`}>Attribute Value</Label>
                    <Input
                      type="text"
                      name="value"
                      id={`value-${index}`}
                      value={attribute.value}
                      onChange={(e) => handleAttributeChange(index, e)}
                      placeholder="Attribute Value"
                      required
                    />
                  </FormGroup>
                </Col>
                <Col md={4} className="remove-button mt-3">
                  <Button
                    color="danger"
                    onClick={() => {
                      const newAttributes = attributes.filter(
                        (_, i) => i !== index
                      );
                      setAttributes(newAttributes);
                    }}
                  >
                    <FaTrashAlt /> Remove
                  </Button>
                </Col>
              </Row>
            ))}
            <Button color="secondary" onClick={handleAddAttribute}>
              <FaPlus /> Add Attribute
            </Button>
            <Button color="primary" onClick={handleRegisterUser}>
              Register User
            </Button>
          </Form>
          {message && (
            <Alert
              color={message.startsWith("Error") ? "danger" : "success"}
              className="mt-3"
            >
              {message}
            </Alert>
          )}
        </CardBody>
      </Card>
    </Container>
  );
};

export default RegisterUser;
