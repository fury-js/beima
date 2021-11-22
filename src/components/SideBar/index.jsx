import React from "react";
import styles from "./sideBar.module.css";

import { Link, useLocation } from "react-router-dom";
import {
  BeimaLogo,
  DashHistoryIcon,
  DashHomeIcon,
  DashUserIcon,
} from "../../assets/svg";

function SideBar() {
  const activeRoute = useLocation().pathname;

  const activeIconClass = (route) => {
    if (activeRoute === route || activeRoute === route + "/")
      return `${styles["icon"]} ${styles["active"]}`;

    return `${styles["icon"]}`;
  };

  return (
    <div className={`${styles["container"]} hidden md:block`}>
      <div className="flex items-end py-10 pl-10">
        <BeimaLogo className={`${styles.logo}`} />
        <span className="ml-3 text-white text-2xl">Beima</span>
      </div>
      <ul>
        <li className="flex mb-8">
          <Link to="/dashboard">
            <div className={`${styles["icon-container"]} gap-4 pl-10`}>
              <DashHomeIcon className={activeIconClass("/dashboard")} />
              <span>Dashboard</span>
            </div>
          </Link>
        </li>
        <li className="flex mb-8">
          <Link to="/dashboard/history">
            <div className={`${styles["icon-container"]} gap-4 pl-10`}>
              <DashHistoryIcon
                className={activeIconClass("/dashboard/history")}
              />
              <span>History</span>
            </div>
          </Link>
        </li>
        <li className="flex mb-8">
          <Link to="/dashboard/user">
            <div className={`${styles["icon-container"]} gap-4 pl-10`}>
              <DashUserIcon className={activeIconClass("/dashboard/user")} />
              <span>User</span>
            </div>
          </Link>
        </li>
      </ul>
    </div>
  );
}

export { SideBar };
