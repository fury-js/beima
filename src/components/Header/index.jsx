import React from "react";
import { useLocation } from "react-router";
import { BeimaLogo, userSvg } from "../../assets/svg";
import styles from "./header.module.css";

function Header(props) {
  const { pathname } = useLocation();

  // Handler functions
  const isDashboardPath = () => pathname.includes("dashboard");

  return (
    <header className={`container ${styles.container} flex items-center py-4 text-white`}>
      {!isDashboardPath() && <div className="flex items-end">
        <BeimaLogo className={`${styles.logo}`} />
        <span className="ml-3 text-2xl">Beima</span>
      </div>}
      {isDashboardPath() && <div className="ml-auto flex items-center">
        <img src={userSvg} />
        <span className="ml-3"><strong>Atoms</strong> Kruft</span>
      </div>}
    </header>
  );
}

export { Header };
