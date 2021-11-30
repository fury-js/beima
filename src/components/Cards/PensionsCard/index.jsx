import React from "react";

import styles from "./pensionsCard.module.css";

const PensionsCard = ({ Icon, text, alt = "", onClick }) => {
  return (
    <div className={`${styles["container"]}`} onClick={onClick}>
      <div className={`flex flex-col justify-center pl-6`}>
        <div className={`${styles["icon-container"]}`}>
          {Icon ? <img src={Icon} alt={alt} /> : ""}
        </div>
        <p className="mt-4 text-white">{text}</p>
      </div>
    </div>
  );
};

export { PensionsCard };
