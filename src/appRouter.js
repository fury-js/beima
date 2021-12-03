import React, { useEffect } from "react";

import { Redirect, Route, Switch, useLocation } from "react-router-dom";
import { MainLayout, DashboardLayout } from "./layouts";

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
      <ScrollToTop />
      <Switch>
        <Route path="/dashboard" render={(props) => <DashboardLayout />} />
        <Route path="/" render={(props) => <MainLayout />} />
        <Route path="*" render={(props) => <Redirect to="/" />} />
      </Switch>
    </>
  );
};

export default AppRouter;
