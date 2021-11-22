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
    <aside className={`${styles["container"]} py-10 hidden lg:block`}>
      <Link to="/">
        <div className="flex items-end ">
          <BeimaLogo className={`${styles.logo}`} />
          <span className="ml-3 text-white text-2xl">Beima</span>
        </div>
      </Link>
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
            <div className={linkClass("/dashboard/user/profile")}>
              {/* <UserIcon className={`${styles.sideBarIcon}`} /> */}
            </div>
            <span>Profile</span>
          </Link>
        </li>
        <li className="flex mb-8">
          <Link to="/dashboard/user">
            <div className={linkClass("/dashboard/user/transactions")}>
              {/* <MoneyIcon className={`${styles.sideBarIcon}`} /> */}
            </div>
            <span>Transactions</span>
          </Link>
        </li>
        <li className="flex mb-8">
          <Link to="/dashboard">
            <div className={linkClass("/dashboard/pharmacy")}>
              {/* <CartIcon className={`${styles.sideBarIcon}`} /> */}
            </div>
            <span>Pharmacy</span>
          </Link>
        </li>
      </ul>
    </aside>
  );
}

export { SideBar };
