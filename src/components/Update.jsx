import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Container, Form, FormGroup, Label, Input } from "reactstrap";
import { toast } from 'react-toastify';

const Update = () => {
    const [asset, setAsset] = useState({ id: "", name: "", owner: "" });
    const { id } = useParams(); // Get the asset ID from the route parameters
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch the asset details by ID
        const fetchAsset = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/insurance_buy/readAsset/${id}`);
                setAsset(res.data);
            } catch (err) {
                toast.error("Failed to fetch asset-"+err.message);
                console.log(err);
            }
        };

        fetchAsset();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAsset(prevAsset => ({ ...prevAsset, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.patch(`http://localhost:5000/updateAsset/${id}`, asset);
            toast.success("Asset updated successfully");
            navigate("/"); // Redirect to the DataTable page after successful update
        } catch (err) {
            toast.error("Failed to update asset-"+err.message);
            console.log(err);
        }
    };

    return (
        
        <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
            <Form onSubmit={handleSubmit} style={{ width: "100%", maxWidth: "600px" }}>
                <h2>Update Asset</h2>
                <FormGroup>
                    <Label for="id">ID</Label>
                    <Input type="text" name="id" id="id" value={asset.id} readOnly />
                </FormGroup>
                <FormGroup>
                    <Label for="name">Name</Label>
                    <Input type="text" name="name" id="name" value={asset.name} onChange={handleChange} />
                </FormGroup>
                <FormGroup>
                    <Label for="owner">Owner</Label>
                    <Input type="text" name="owner" id="owner" value={asset.owner} onChange={handleChange} />
                </FormGroup>
                <Button type="submit" color="primary">Update</Button>
                <Button color="secondary" onClick={() => navigate("/")}>Back to List</Button>
            </Form>
        </Container>
    );
}

export default Update;
