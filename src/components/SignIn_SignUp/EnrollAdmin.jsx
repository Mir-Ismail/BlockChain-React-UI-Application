import React, { useState } from "react";
import axios from "axios";
import { Button, Form, FormGroup, Label, Input, Alert } from "reactstrap";

const EnrollAdmin = () => {
  const [org, setOrg] = useState("");
  const [message, setMessage] = useState("");

  const handleEnrollAdmin = async () => {
    try {
      const response = await axios.post("http://localhost:5000/enroll/enrollAdmin", {
        org,
      });
      setMessage(response.data);
    } catch (error) {
      setMessage(
        `Error: ${error.response ? error.response.data : error.message}`
      );
    }
  };

  return (
    <div>
      <h2 className="text-center">Enroll Admin</h2>
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
          />
        </FormGroup>
        <Button color="primary" onClick={handleEnrollAdmin}>
          Enroll Admin
        </Button>
      </Form>
      {message && <Alert className="mt-3">{message}</Alert>}
    </div>
  );
};

export default EnrollAdmin;
