import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";

import {
  connectToMetaMask,
  getActiveWallet,
  listenToAccountChanges,
  hasEthereum,
  unmountEthListeners,
} from "../services/web3Service";

import { useHistory } from "react-router-dom";

const AppContext = createContext();

export function AppProvider({ children }) {
  const history = useHistory();
  const [isInitiallyFetched, setIsInitiallyFetched] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [hasMetaMask, setHasMetaMask] = useState(true);

  const handleWalletConnect = useCallback(() => {
    return (async () => {
      const connectionStatus = await connectToMetaMask();
      if (!connectionStatus) return false;

      // const address = getActiveWallet();
      // console.log(address);

      setIsConnected(true);

      localStorage.setItem("wallet-connection", true);

      return true;
    })();
  }, []);

  const resetValues = useCallback(() => {
    return (async () => {
      const address = getActiveWallet();
      console.log(address);

      setIsConnected(true);

      localStorage.setItem("wallet-connection", true);

      return true;
    })();
  }, []);

  const handleWalletDisconnect = () => {
    setIsConnected(false);
    localStorage.removeItem("wallet-connection");
    history.replace("/");
  };

  const handleAccountChanged = (address) => {
    if (!address) return handleWalletDisconnect();
    resetValues();
  };

  useEffect(() => {
    if (!isInitiallyFetched) return;

    if (!hasEthereum()) return;
    listenToAccountChanges(handleAccountChanged);

    return unmountEthListeners();
  });

  useEffect(() => {
    if (isInitiallyFetched) return;
    if (!hasEthereum()) {
      console.log("Please Install Meta Mask");
      return setHasMetaMask(false);
    }
    const isInjected = localStorage.getItem("wallet-connection");
    if (!isInjected) return setIsInitiallyFetched(true);

    handleWalletConnect();
    setIsInitiallyFetched(true);
    return;
  }, [handleWalletConnect, isInitiallyFetched]);

  return (
    <AppContext.Provider
      value={{
        isConnected,
        setIsConnected,
        handleWalletConnect,
        handleWalletDisconnect,
        hasMetaMask,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);

  if (!context) throw new Error("useApp must be used inside a `AppProvider`");

  return context;
}
