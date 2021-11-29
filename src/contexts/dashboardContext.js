import { createContext, useContext, useEffect } from "react";

const DashboardContext = createContext();

export function DashboardProvider({ children }) {
  const isRegistered = false;
  useEffect(() => {}, []);

  return (
    <DashboardContext.Provider value={{ isRegistered }}>
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboardContext() {
  const context = useContext(DashboardContext);

  if (!context)
    throw new Error(
      "Dashboard context must be used inside a `DashboardProvider`"
    );

  return context;
}
