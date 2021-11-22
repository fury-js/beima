import React from "react";
import { Route } from "react-router-dom";
import { Header } from "../../components";
import { LandingPage } from "../../pages";
import styles from "./main-layout.module.css";

function MainLayout({ children, ...rest }) {
  return (
    <div className={`${styles["container"]}`}>
      <Header />
      <Route path="/" render={(props) => <LandingPage />} />
    </div>
  );
}

export { MainLayout };
