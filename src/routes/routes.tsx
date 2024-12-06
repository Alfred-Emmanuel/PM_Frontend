import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./protectedRoutes";

const Home = lazy(() => import("../Home"));
// const About = lazy(() => import("../pages/About"));
const Dashboard = lazy(() => import("../Dashboard"));
const SignUp = lazy(() => import("../SignUp"));

const AppRoutes = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {/* Public Routes */}

        <Route path="/" element={<Home />} />
        <Route path="/sign_up" element={<SignUp />} />
        {/* <Route path="/about" element={<About />} /> */}

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
