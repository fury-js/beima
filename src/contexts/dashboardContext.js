import { createContext, useContext, useEffect, useState } from "react";
import { getUserDetails, userIsRegistered } from "../services/userService";
import { getCurrentNetwork, getBeimaContract } from "../services/web3Service";
import toast from "../utils/toastConfig";

const DashboardContext = createContext();

const coinAssets = [
  { name: "USDT", address: "0x3f0A0EA2f86baE6362CF9799B523BA06647Da018" },
  { name: "USDC", address: "" },
  { name: "ETH", address: "" },
  { name: "TUSD", address: "" },
];

// const history = [...initPensions];

export function DashboardProvider({ children }) {
  const [pensions, setPensions] = useState([]);
  const [user, setUser] = useState(null);
  const [coins] = useState(coinAssets);
  const [isRegistered, setIsRegistered] = useState(true);

  const addNewPensionPlan = (plan) => {
    if (pensions.length) return setPensions([{ ...plan }, ...pensions]);
    setPensions([{ ...plan }]);
  };

  useEffect(() => {
    (async () => {
      const network = await getCurrentNetwork();
      if (network && network !== "kovan") {
        return toast.error("Please Switch to the Kovan Test Network");
      }
      const beima = await getBeimaContract();
      const registerStatus = await userIsRegistered();
      const data = await getUserDetails();
      const { user, pension } = data;
      console.log({ user, pension });
      setUser(user);
      if (pension) setPensions([{ ...pension }]);
      setIsRegistered(registerStatus);
      console.log(beima);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setIsRegistered]);

  return (
    <DashboardContext.Provider
      value={{
        isRegistered,
        setIsRegistered,
        pensions,
        addNewPensionPlan,
        coins,
        user,
      }}
    >
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
