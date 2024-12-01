import { Row, Col, Card, CardTitle, CardBody, Table, Spinner } from "reactstrap";

const TablesBuyer = ({ buyers }) => {
  if (!buyers) {
    // Show a loading indicator if the hospital prop is not defined yet
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
    <Row>
      <Col lg="12">
        <Card>
          <CardTitle tag="h6" className="border-bottom p-3 mb-0">
            <i className="bi bi-card-text me-2"></i> Hospitals
          </CardTitle>
          <CardBody>
            <Table bordered>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Hospital Name</th>
                  <th>Owner Name</th>
                  <th>Contact No.</th>
                </tr>
              </thead>
              <tbody>
                {buyers.length > 0 ? (
                  buyers.map((buyer, index) => (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td>{buyer.user_email}</td>
                      <td>{buyer.user_id}</td>
                      <td>{buyer.membership}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4">No data available</td>
                  </tr>
                )}
              </tbody>
            </Table>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

export default TablesBuyer;
