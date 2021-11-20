import { BrowserRouter as Router } from "react-router-dom";

import AppRouter from "./appRouter";
import { AppProvider } from "./contexts/appContext";

function App() {
  return (
    <div className="App">
      <Router basename={"/"}>
        <AppProvider>
          <AppRouter />
        </AppProvider>
      </Router>
    </div>
  );
}

export default App;
