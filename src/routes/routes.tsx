import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./protectedRoutes";
import Home from "../pages/Home.tsx";
import About from "../pages/About.tsx";
import Dashboard from "../pages/Dashboard.tsx";
import SignUp from "../pages/SignUp.tsx";

// const Home = lazy(() => import("../pages/Home.tsx"));
// const About = lazy(() => import("../pages/About.tsx"));
// const Dashboard = lazy(() => import("../pages/Dashboard.tsx"));
// const Register = lazy(() => import("../pages/SignUp.tsx"))

const AppRoutes = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {/* Public Routes */}

        <Route path="/" element={<Home />} />
        <Route path="/sign_up" element={<SignUp />} />
        <Route path="/about" element={<About />} />

        {/* Protected Routes */}

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
