// import { useState } from "react";
import AppRoutes from "./routes/routes";
import { BrowserRouter as Router } from "react-router-dom";
import { UserProvider } from "./context/UserContext.tsx";
import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <Router>
      <ToastContainer />
      <UserProvider>
        <AppRoutes />
      </UserProvider>
    </Router>
  );
};

export default App;
