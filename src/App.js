import { BrowserRouter as Router } from "react-router-dom";

import AppRouter from "./appRouter";

function App() {
  return (
    <div className="App">
      <Router basename={"/"}>
        <AppRouter />
      </Router>
    </div>
  );
}

export default App;
