import React from "react";
import styles from "./starter.module.css";
import { useNavigate } from "react-router-dom";

function Category(props) {
  const navigate = useNavigate();

  const handleNavigation = (event) => {
    event.preventDefault(); // Prevents the default action of the button click
    navigate("/plandetail", { state: { title: props.title } });
  };

  return (
    <div className={styles.card}>
      <div className={styles.content}>
        <div className={styles.title}>{props.title}</div>
        <div className={styles.price}>{props.price}</div>
        <div className={styles.description}>{props.description}</div>
      </div>
      <button className={styles.mybutton} onClick={handleNavigation}>
        Buy now
      </button>
    </div>
  );
}

export default Category;
