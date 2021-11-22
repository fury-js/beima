import React from "react";
import styles from "./sideBar.module.css";

import { Link, useLocation } from "react-router-dom";
import { BeimaLogo, DashIcon } from "../../assets/svg";

function SideBar() {
  const activeRoute = useLocation().pathname;

  const linkClass = (route) => {
    if (activeRoute.includes(route))
      return `${styles["icon-container"]} ${styles["active"]}`;

    return `${styles["icon-container"]}`;
  };

  return (
    <div className={`${styles["container"]} px-10 hidden md:block`}>
      <div className="flex items-end py-10">
        <BeimaLogo className={`${styles.logo}`} />
        <span className="ml-3 text-white text-2xl">Beima</span>
      </div>
      <ul>
        <li className="flex mb-8">
          <Link to="/dashboard/user">
            <div className={linkClass("/dashboard")}>
              <DashIcon className={`${styles["icon"]}`} />
            </div>
            <span>Dashboard</span>
          </Link>
        </li>
        <li className="flex mb-8">
          <Link to="/dashboard/user">
            <div className={linkClass("/dashboard/user/history")}>
              {/* <MoneyIcon className={`${styles["icon"]}`} /> */}
            </div>
            <span>History</span>
          </Link>
        </li>
        <li className="flex mb-8">
          <Link to="/dashboard/user">
            <div className={linkClass("/dashboard/user/profile")}>
              {/* <UserIcon className={`${styles["icon"]}`} /> */}
            </div>
            <span>Profile</span>
          </Link>
        </li>
      </ul>
    </div>
  );
}

export { SideBar };
