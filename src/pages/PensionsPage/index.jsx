import React from "react";
import { PlusSvg, plusSvg } from "../../assets/svg";
import { Button } from "../../components";
import styles from "./pensions-page.module.css";

function PensionsPage(props) {
  return (
    <div className={`${styles["container"]} container`}>
      <div className="flex justify-center w-full flex-col items-center">
        <button
          className={`${styles["blue-btn"]} w-2/3 justify-center items-center py-8 flex flex-col gap-8`}
        >
          <PlusSvg />
          Create New Pension
        </button>
        <p className="text-white mt-4 mx-auto">
          No Pensions, Click the button above to make one
        </p>
      </div>
    </div>
  );
}

export { PensionsPage };
