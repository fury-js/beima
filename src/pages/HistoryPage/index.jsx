import React from "react";

import { useDashboardContext } from "../../contexts/dashboardContext";
import styles from "./history-page.module.css";
import HistoryItem from "./components/HistoryItem/index";

function HistoryPage(props) {
  const { pensions } = useDashboardContext();
  const hasPensions = pensions.length > 0;

  return (
    <div className={`${styles["container"]} container`}>
      {hasPensions && (
        <div>
          {pensions.map((item, index) => {
            item.ipfsHash = index + 1;
            return (
              <div key={Math.random() * 3} className="mb-5">
                <HistoryItem details={item} />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export { HistoryPage };
