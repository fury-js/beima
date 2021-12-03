import React from "react";
import { MenuIcon, userSvg } from "../../../../assets/svg";
import { useDashboardContext } from "../../../../contexts/dashboardContext";
import styles from "./dash-header.module.css";

function DashHeader({ onSetOpenSideBar }) {
  const { user } = useDashboardContext();

  return (
    <header
      className={`container ${styles.container} flex items-center py-4 text-white`}
    >
      <MenuIcon
        onClick={() => onSetOpenSideBar(true)}
        className="md:hidden cursor-pointer"
      />
      <div className="ml-auto flex items-center">
        <img src={userSvg} alt="user" />
        <div className="ml-3">
          <span>{user?.firstName}</span> <span>{user?.lastName}</span>
        </div>
      </div>
    </header>
  );
}

export { DashHeader };
