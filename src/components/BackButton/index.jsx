import React from "react";
import { Link } from "react-router-dom";
import { LeftArrow } from "../../assets/svg";
import styles from "./back-button.module.css";

function BackButton({ to }) {
  return (
    <div className={`${styles["container"]} my-2`}>
      <Link to={to}>
        <div className="flex items-center">
          <div className={`mr-4 ${styles["svg-body"]}`}>
            <LeftArrow />
          </div>
          <span>Back</span>
        </div>
      </Link>
    </div>
  );
}

export default BackButton;
