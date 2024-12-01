import { Row, Col, CardTitle, Card, Form, Input, Button, Table } from "reactstrap";
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const About = ({ role }) => {
  const [roles, setRoles] = useState([]);
  const [newRole, setNewRole] = useState("");

  const getRoles = async () => {
    try {
      const response = await axios.get("http://localhost:5000/roles");
      setRoles(response.data);
    } catch (err) {
      console.error(err.message);
      toast.error("Failed to fetch roles");
    }
  };

  useEffect(() => {
    getRoles();
  }, [role]);

  const onChange = (e) => {
    setNewRole(e.target.value);
    console.log(e.target.value);
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    if (!newRole) {
      toast.error("Role cannot be empty");
      return;
    }
    try {
      const response = await axios.post("http://localhost:5000/roles/create_role", { user_role: newRole }, {
        headers: { "Content-Type": "application/json" }
      });
      toast.success(response.data.message);
      setNewRole("");
      getRoles();
    } catch (err) {
      if (err.response && err.response.data) {
        toast.error(err.response.data);
      } else {
        console.error(err);
        toast.error("Failed to add role");
      }
    }
  };

  const handleDelete = async (roleId) => {
    try {
      await axios.delete(`http://localhost:5000/roles/delete_role/${roleId}`);
      toast.success("Role deleted successfully!");
      getRoles(); // Refresh roles after deleting one
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete role");
    }
  };

  return (
    <Row className="mt-4">
      <Col lg="12" className="mx-auto">
        <Card  className="shadow" style={{ textAlign:'center' }}>
          <CardTitle tag="h5" className="border-bottom p-3 mb-0">
            <i className="bi bi-bell me-2"></i>
            About MedChain Financial Care
          </CardTitle>
          <div className="p-3">
            <Form onSubmit={onSubmitForm} className="d-flex mb-4">
              <Input 
                type="text" 
                value={newRole} 
                onChange={onChange} 
                placeholder="Enter role" 
                className="me-2"
              />
              <Button color="primary" type="submit">Add Role</Button>
            </Form>
            <h2>Roles</h2>
            <Table className="table-striped table-hover">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Role Name</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {roles.map((role, index) => (
                  <tr key={role.role_id}>
                    <td>{index + 1}</td>
                    <td>{role.user_role}</td>
                    <td>
                      <Button 
                        color="danger" 
                        size="sm" 
                        onClick={() => handleDelete(role.role_id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Card>
      </Col>
    </Row>
  );
};

export default About;
