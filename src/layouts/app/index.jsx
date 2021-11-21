import React from "react";
import { Header } from "../../components";
import styles from "./app.module.css";

function AppLayout({ children }) {
  return (
    <div className={`${styles.dashboardCon}`}>
      <Header />
      <div className={`${styles["container"]} flex`}>
        <div className={`${styles["center-con"]} lg:h-screen`}>
          {children}
        </div>
      </div>
    </div>
  );
}

export { AppLayout };
