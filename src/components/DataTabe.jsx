import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Table, Button, Container, Row, Col } from "reactstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./DataTable.css"; // Import custom CSS
import { useNavigate } from "react-router-dom";

const DataTable = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:5000/insurance_buy/readAllAssets");
      setData(res.data);
    } catch (err) {
      toast.error("Failed to fetch data");
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/insurance_buy/deleteAsset/${id}`);
      fetchData(); // Refresh the data after deletion
      toast.success("Asset deleted successfully");
    } catch (err) {
      toast.error("Failed to delete asset - " + err.message);
      console.log(err);
    }
  };

  return (
    <Container className="data-table-container">
      <Row className="my-3">
        <Col>
          <h1 className="table-heading">
            Hyperledger Fabric Private Blockchain CRUD Operations
          </h1>
        </Col>
      </Row>
      <Row className="my-3 justify-content-end">
        <Col xs="auto">
          <Button color="success">
            <Link to={"/create"} className="text-white">
              Create
            </Link>
          </Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <Table className="data-table" responsive>
            <thead>
              <tr>
                <th>CNIC</th>
                <th>Uploaded</th>
                <th>CreatedBy</th>
                <th>Operation</th>
              </tr>
            </thead>
            <tbody>
              {data && data.length > 0 ? (
                data.map((asset, index) => (
                  <tr key={index}>
                    <td>{asset.cnic}</td>
                    <td>
                      <img
                        style={{
                          borderRadius: "50%", // Adjust this value to control the roundness
                          width: "100px", // Adjust size as needed
                          height: "100px", // Adjust size as needed
                          objectFit: "fill", // Ensures the image covers the container properly
                        }}
                        src={`https://gateway.pinata.cloud/ipfs/${asset.user_img}`}
                        alt={asset.user_img}
                      />
                    </td>
                    <td>{asset.createdBy}</td>
                    <td>
                      <Button
                        color="danger"
                        onClick={() => handleDelete(asset.cnic)}
                        className="mr-2"
                      >
                        Delete
                      </Button>
                      <Button color="primary">
                        <Link
                          to={`/update/${asset.cnic}`}
                          className="text-white"
                        >
                          Update
                        </Link>
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4">No data available</td>
                </tr>
              )}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default DataTable;
