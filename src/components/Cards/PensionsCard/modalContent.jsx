import React from "react";
import { Button } from "../../Button";

import styles from "./pensionsCard.module.css";

const PensionsCardModal = ({ description, Icon, alt }) => {
  return (
    <div className={`${styles["modal-container"]} flex flex-col md:flex-row p-2 py-6`} >
      <div className={`flex flex-col justify-center p-6 py-10 flex-grow lg:mr-20`}>
        <h1 className="text-center">Beima <span>10yrs Plan</span></h1>
        <div>
          <div className="text-gray mt-5">Monthly deposit</div>
          <div className={`${styles["input-container"]} flex`}>
            <span className="flex items-center justify-center">USDT</span>
            <input className="p-2 border-0 " placeholder="0.00" />
          </div>
        </div>
        <div className="text-gray my-10 flex justify-center items-center p-2 py-5">
          {description}
        </div>
        <div className={`${styles["privacy-check-wrapper"]} flex flex-col md:flex-row gap-4 items-center mt-5`}>
          <div className="flex items-center">
            <input type="checkbox" />
            <span className="ml-3">I agree to all statements included in the Privacy Policy</span>
          </div>
          <Button onClick={() => ""} className="font-medium md:ml-auto">
            APPROVE
          </Button>
        </div>
      </div>
      <div className={`${styles["modal-icon"]} md:order-first ml-auto md:ml-0 md:mt-auto`}>
        {Icon ? <img src={Icon} alt={alt} /> : ""}
      </div>
    </div>
  );
};

export { PensionsCardModal };
