import React from "react";
import styles from "./sideBar.module.css";

import { Link, useLocation } from "react-router-dom";
import { CloseButton } from "../../components";

import {
  BeimaLogo,
  DashHistoryIcon,
  DashHomeIcon,
  DashUserIcon,
} from "../../assets/svg";

function SideBar({ isOpen, onSetOpenSideBar }) {
  const activeRoute = useLocation().pathname;

  const containerClass = (() => {
    if (isOpen) return `${styles["container"]} ${styles["active"]}`;
    return `${styles["container"]}`;
  })();

  const activeIconClass = (route) => {
    let isBaseRoute = (r) => r === "/dashboard" || r === "/dashboard/";
    if (isBaseRoute(route) && isBaseRoute(activeRoute)) {
      return `${styles["icon-container"]} pl-6 xl:pl-10 ${styles["active"]}`;
    }

    if (!isBaseRoute(route) && activeRoute.includes(route))
      return `${styles["icon-container"]} pl-6 xl:pl-10 ${styles["active"]}`;

    return `${styles["icon-container"]} pl-6 xl:pl-10`;
  };

  return (
    <div className={containerClass}>
      <div className="md:hidden">
        <CloseButton onClick={() => onSetOpenSideBar(false)} />
      </div>
      <div className="flex items-end py-10 pl-6 xl:pl-10">
        <BeimaLogo className={`${styles.logo}`} />
        <span className="ml-3 text-white text-2xl">Beima</span>
      </div>
      <ul>
        <li className="flex mb-8">
          <Link to="/dashboard">
            <div className={activeIconClass("/dashboard")}>
              <DashHomeIcon className={`${styles["icon"]}`} />
              <span className="pl-4">Dashboard</span>
            </div>
          </Link>
        </li>
        <li className="flex mb-8">
          <Link to="/dashboard/pensions">
            <div className={activeIconClass("/dashboard/pensions")}>
              <DashHistoryIcon className={`${styles["icon"]}`} />
              <span className="pl-4">Pensions</span>
            </div>
          </Link>
        </li>
        <li className="flex mb-8">
          <Link to="/dashboard/history">
            <div className={activeIconClass("/dashboard/history")}>
              <DashHistoryIcon className={`${styles["icon"]}`} />
              <span className="pl-4">History</span>
            </div>
          </Link>
        </li>

        <li className="flex mb-8">
          <Link to="/dashboard/profile">
            <div className={activeIconClass("/dashboard/profile")}>
              <DashUserIcon className={`${styles["icon"]}`} />
              <span className="pl-4">Profile</span>
            </div>
          </Link>
        </li>
      </ul>
    </div>
  );
}

export { SideBar };
