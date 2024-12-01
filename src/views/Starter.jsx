import { Col, Row } from "reactstrap";
import SalesChart from "../components/dashboard/SalesChart";
import TopCards from "../components/dashboard/TopCards";
import Catagory from "../components/dashboard/Catagory";
import axios from "axios";
import React, { useEffect, useState } from "react";
// import Tables from "./ui/Tables";

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

const Starter = ({ role }) => {
  const [name, setName] = useState("");
  // const [email,setemail] = useState("");

  const getName = async () => {
    try {
      const response = await axios.get("http://localhost:5000/dashboard", {
        headers: { token: localStorage.token },
      });
      const parseres = await response.data;
      setName(parseres.user_name);
      // setemail(parseres.user_email)
      localStorage.setItem("user_email", parseres.user_email);
    } catch (err) {
      console.error(err.message);
    }
  };
  useEffect(() => {
    getName();
  }, []);
  return (
    <div>
      {/***Top Cards***/}
      <Row>
        <Col sm="6" lg="3">
          <TopCards
            bg="bg-light-success text-success"
            title="Profit"
            subtitle="Yearly Earning"
            earning="$21k"
            icon="bi bi-wallet"
          />
        </Col>
        <Col sm="6" lg="3">
          <TopCards
            bg="bg-light-danger text-danger"
            title="Refunds"
            subtitle="Refund given"
            earning="$1k"
            icon="bi bi-coin"
          />
        </Col>
        <Col sm="6" lg="3">
          <TopCards
            bg="bg-light-warning text-warning"
            title="New Project"
            subtitle="Yearly Project"
            earning="456"
            icon="bi bi-basket3"
          />
        </Col>
        <Col sm="6" lg="3">
          <TopCards
            bg="bg-light-info text-into"
            title="Sales"
            subtitle="Weekly Sales"
            earning="210"
            icon="bi bi-bag"
          />
        </Col>
      </Row>

      {/***Sales & Feed***/}
      {role === "Insurance" && (
        <Row>
          <Col sm="12" lg="12" xl="12" xxl="12">
            <SalesChart />
          </Col>
        </Row>
      )}
      {/***Table ***/}
      {/* <Row>
        <Col lg="12">
          <Tables role={role} />
        </Col>
      </Row> */}
    </div>
  );
};

export default Starter;
