import React, { useState } from "react";

import { PlusSvg } from "../../assets/svg";
import { useDashboardContext } from "../../contexts/dashboardContext";
import { PensionPlans } from "../../layouts/DashLayout/components/PensionPlans";
import styles from "./pensions-page.module.css";
import PensionItem from "./components/PensionItem/index";

function PensionsPage(props) {
  const { pensions } = useDashboardContext();
  const hasPensions = pensions.length > 0;

  const [willCreate, setWillCreate] = useState(false);
  return (
    <div className={`${styles["container"]} container`}>
      <div className={hasPensions ? "hidden" : ""}>
        <div className="flex justify-center w-full flex-col items-center">
          <button
            onClick={() => setWillCreate(true)}
            className={`${styles["blue-btn"]} w-full md:w-2/3 justify-center items-center py-8 flex flex-col gap-8`}
          >
            <PlusSvg />
            Create New Pension
          </button>
          <p className="text-white mt-4 mx-auto">
            No Pensions, Click the button above to make one
          </p>
        </div>
        {willCreate && (
          <div className={` py-14`}>
            <h4 className="text-white mb-5">Pension plans</h4>
            <PensionPlans />
          </div>
        )}
      </div>
      {hasPensions && (
        <div>
          {pensions.map((item, index) => {
            item.ipfsHash = index + 1;
            return (
              <div key={Math.random() * 3} className="mb-5">
                <PensionItem details={item} />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export { PensionsPage };
