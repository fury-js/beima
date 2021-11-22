import React from "react";
import styles from "./sideBar.module.css";
 
import { Link, useLocation } from "react-router-dom";
import { BeimaLogo } from "../../assets/svg";

function SideBar() {
  const activeRoute = useLocation().pathname;

  const linkClass = (route) => {
    if (activeRoute.includes(route))
      return `${styles["iconCon"]} ${styles["active"]}`;

    return `${styles["iconCon"]}`;
  };

  return (
    <div className={`${styles.sideBarCon} py-10 px-10 hidden md:block`}>
    <div className="flex items-end pb-4">
      <BeimaLogo className={`${styles.logo}`} />
      <span className="ml-3 text-white text-2xl">Beima</span>
    </div>
      <ul>
        <li className="flex mb-8">
          <Link to="/dashboard/user">
            <div className={linkClass("/dashboard/user")}>
              {/* <DashBoardIcon className={`${styles.sideBarIcon}`} /> */}
            </div>
            <span>Dashboard</span>
          </Link>
        </li>
        <li className="flex mb-8">
          <Link to="/dashboard/user">
            <div className={linkClass("/dashboard/user/history")}>
              {/* <MoneyIcon className={`${styles.sideBarIcon}`} /> */}
            </div>
            <span>History</span>
          </Link>
        </li>
        <li className="flex mb-8">
          <Link to="/dashboard/user">
            <div className={linkClass("/dashboard/user/profile")}>
              {/* <UserIcon className={`${styles.sideBarIcon}`} /> */}
            </div>
            <span>Profile</span>
          </Link>
        </li>
      </ul>
    </div>
  );
}

export { SideBar };
