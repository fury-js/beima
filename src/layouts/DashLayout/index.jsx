import React, { useState } from "react";
import { Route } from "react-router-dom";
import {
  DashboardHome,
  HistoryPage,
  PensionsPage,
  SinglePensionPage,
  ProfilePage,
} from "../../pages";
import { SideBar } from "../../components";

import styles from "./dashboard-layout.module.css";
import { DashHeader } from "./components/DashHeader";
import { DashboardProvider } from "../../contexts/dashboardContext";

function DashboardLayout({ children, ...rest }) {
  const [openSideBar, setOpenSideBar] = useState(false);

  return (
    <DashboardProvider>
      <div className={`${styles["container"]}`}>
        <SideBar isOpen={openSideBar} onSetOpenSideBar={setOpenSideBar} />
        <div className={`${styles["content-container"]}`}>
          <DashHeader onSetOpenSideBar={setOpenSideBar} />
          <Route
            exact
            path="/dashboard/pensions"
            render={(props) => <PensionsPage />}
          />
          <Route
            exact
            path="/dashboard/pensions/:id"
            render={(props) => <SinglePensionPage />}
          />
          <Route
            exact
            path="/dashboard/history"
            render={(props) => <HistoryPage />}
          />
          <Route
            exact
            path="/dashboard/profile"
            render={(props) => <ProfilePage />}
          />
          <Route
            exact
            path="/dashboard/"
            render={(props) => <DashboardHome />}
          />
        </div>
      </div>
    </DashboardProvider>
  );
}

export { DashboardLayout };
