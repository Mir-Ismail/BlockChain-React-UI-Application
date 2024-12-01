import React from "react";
import { Col, Row } from "reactstrap";
import Catagory from "../dashboard/Catagory";
function MultiStepPlan() {
  const VoucherDetail = [
    {
      title: "Gold",
      price: "$99.99",
      description:
        "Lorem ipsupiscin et malesuada fames ac ante ipsum primis in faucibus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur at posuere eros. Interdum et malesuada fames",
    },
    {
      title: "Silver",
      price: "$79.99",
      description:
        "Lorem ipsupiscin et malesuada fames ac ante ipsum primis in faucibus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur at posuere eros. Interdum et malesuada fames",
    },
    {
      title: "Bronze ",
      price: "$59.99",
      description:
        "Lorem ipsupiscin et malesuada fames ac ante ipsum primis in faucibus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur at posuere eros. Interdum et malesuada fames",
    },
  ];
  return (
    <div className="justify-content-center">
      <Row>
        {VoucherDetail.map((vd, index) => (
          <Col lg="6" sm="6" xl="3" key={index}>
            <Catagory
              title={vd.title}
              price={vd.price}
              description={vd.description}
            ></Catagory>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default MultiStepPlan;
