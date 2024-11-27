// import { useState } from "react";
import AppRoutes from "./routes/routes";
import { BrowserRouter as Router } from "react-router-dom";
import { UserProvider } from "./context/UserContext.tsx";

const App = () => {
  return (
    <Router>
      <UserProvider>
        <AppRoutes />
      </UserProvider>
    </Router>
  );
};

export default App;
