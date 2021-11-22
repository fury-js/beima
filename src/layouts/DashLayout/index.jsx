import React from "react";
import { Route } from "react-router-dom";
import { DashboardHome } from "../../pages";
import { SideBar } from "../../components";
import styles from "./dashboard-layout.module.css";

function DashboardLayout({ children, ...rest }) {
  return (
    <div className={`${styles["container"]}`}>
      <SideBar />
      <Route path="/" render={(props) => <DashboardHome />} />
    </div>
  );
}

export { DashboardLayout };
