import React from "react";
import { barchartImage } from "../../../../assets/images";
import styles from "./history-item.module.css";

const getInterest = (interest) => {
  if (interest.currency === "$")
    return `${interest.currency}${interest.amount}`;

  return `${interest.amount} ${interest.currency}`;
};

function PensionItem({ details }) {
  return (
    <div className={`${styles["container"]}`}>
      <div className="flex flex-wrap sm:flex-nowrap justify-center px-4 py-8 md:py-4 gap-x-5 items-center">
          <div className="mb-4 md:mb-0">
          <img src={barchartImage} alt="" />
        </div>
        <div className="w-full">
          <div className="flex flex-wrap justify-between">
            <div>{details.name} Plan</div>
            <div className="">
              <span className="pr-3 mb-1">Interest: </span>
              <span className={`${styles["detail"]} mb-1`}>
                {getInterest(details.interest)}
              </span>
            </div>
          </div>
          <div>
            <span className="pr-3 mb-1">Percentage Returns:</span>
            <span className={`${styles["detail"]} mb-1`}>
              {details.percentageReturn}%
            </span>
          </div>
          <div className="flex flex-wrap justify-between">
            <div>
              <span className="pr-3 mb-1">Date Created:</span>
              <span className={`${styles["detail"]} mb-1`}>
                {details.dateCreated}
              </span>
            </div>
            <div className="">
              <span className="pr-3 mb-1">Maturity Date:</span>
              <span className={`${styles["detail"]} mb-1`}>
                {details.maturityDate}
              </span>
            </div>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
}

export default PensionItem;
