import "./App.css";

import React from "react";
import { Container } from "react-bootstrap";
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";

import { history } from "./_helpers/history";
import { AuthRoute } from "./components/authRoute";
import Footer from "./components/footer";
import { Navigation } from "./components/navigation";
import { Dashboard } from "./pages/dashboard/dashboard";
import { Home } from "./pages/home/home";
import { Login } from "./pages/login/login";
import { Logout } from "./pages/logout/logout";
import { Register } from "./pages/register/register";
import UserProfile from "./pages/userprofile/userprofile";

const App = () => {
  history.navigate = useNavigate();
  history.location = useLocation();

  return (
    <Container fluid className="py-4">
      <Navigation />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/dashboard"
          element={
            <AuthRoute>
              <Dashboard />
            </AuthRoute>
          }
        />
        <Route
          path="/userprofile"
          element={
            <AuthRoute>
              <UserProfile />
            </AuthRoute>
          }
        />
        <Route path="/logout" element={<Logout />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Footer />
    </Container>
  );
};

export default App;
