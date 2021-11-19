import React from "react";
import { BeimaLogo } from "../../assets/svg";
import styles from "./header.module.css";

function Header(props) {
  return (
    <header className={`container ${styles.container}`}>
      <div className="flex items-end py-4">
        <BeimaLogo className={`${styles.logo}`} />
        <span className="ml-3 text-white text-2xl">Beima</span>
      </div>
    </header>
  );
}

export { Header };
