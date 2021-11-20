import React from 'react';
import styles from "./dashboard-home.module.css"

function DashboardHome(props) {
  return (
    <div className={`${styles["container"]} container`}>
      Hello Dashboard Home!
    </div>
  );
}

export { DashboardHome };