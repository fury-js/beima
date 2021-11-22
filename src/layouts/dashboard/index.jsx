import React from "react";
import {
  SideBar,
} from "../../components";
import styles from "./dashboard.module.css";

function DashboardLayout({ children }) {
  return (
    <div className={`${styles.dashboardCon}`}>
        <div className={`${styles["container"]} flex`}>
          <SideBar />
          <div className={`${styles["center-con"]} h-screen md:ml-auto`}>
            {children}
          </div>
        </div>
    </div>
  );
}

export { DashboardLayout };
