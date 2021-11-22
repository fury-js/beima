import { BrowserRouter as Router } from "react-router-dom";

import AppRouter from "./appRouter";
import { Toast, Loader } from "./components";
import { AppProvider } from "./contexts/appContext";
import { LoadingProvider } from "./contexts/loadingContext";
import { ToastProvider } from "./contexts/toastContext";
function App() {
  return (
    <div className="App">
      <Router basename={"/"}>
        <AppProvider>
          <LoadingProvider>
            <ToastProvider>
              <Loader />
              <Toast />
              <AppRouter />
            </ToastProvider>
          </LoadingProvider>
        </AppProvider>
      </Router>
    </div>
  );
}

export default App;
