import React from "react";

import styles from "./pensionsCard.module.css";

const PensionsCard = ({ Icon, text, isDisabled, alt = "" }) => {
  const disabledClass = styles["disabled"];
  
  return (
    <div className={`${styles["container"]} ${isDisabled && disabledClass}`}>
      <button
        className={`flex flex-col justify-center pl-6`}
        disabled={isDisabled}
      >
        {Icon && (
          <span className={`${styles["icon-container"]}`}>
            <img src={Icon} alt={alt} />
          </span>
        )}
        <p className="mt-4 text-white">{text}</p>
      </button>
    </div>
  );
};

export { PensionsCard };
