import React, { useEffect } from "react";

import { Redirect, Route, Switch, useLocation } from "react-router-dom";
import { Header } from "./components";

import { DashboardHome, LandingPage } from "./pages";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

const AppRouter = () => {
  return (
    <>
      <Header />
      <ScrollToTop />
      <Switch>
        <Route path="/dashboard" render={(props) => <DashboardHome />} />
        <Route path="/" render={(props) => <LandingPage />} />
        <Route path="*" render={(props) => <Redirect to="/" />} />
      </Switch>
    </>
  );
};

export default AppRouter;
