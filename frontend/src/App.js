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
import { Footer } from "./components/footer";
import { Navigation } from "./components/navigation";
import { Dashboard } from "./pages/dashboard/dashboard";
import { Home } from "./pages/home/home";
import { Login } from "./pages/login/login";
import { Logout } from "./pages/logout/logout";
import { Register } from "./pages/register/register";
import { UserProfile } from "./pages/userprofile/userprofile";
import { Welcome } from "./pages/welcome/welcome";
import { APP_URL_PATHS } from "./shared/sharedConstants";

const App = () => {
  history.navigate = useNavigate();
  history.location = useLocation();

  return (
    <>
      <Navigation />
      <Container fluid className="py-4">
        <Routes>
          <Route path={APP_URL_PATHS.HOME} element={<Home />} />
          <Route
            path={APP_URL_PATHS.WELCOME}
            element={
              <AuthRoute>
                <Welcome />
              </AuthRoute>
            }
          />
          <Route
            path={APP_URL_PATHS.DASHBOARD}
            element={
              <AuthRoute>
                <Dashboard />
              </AuthRoute>
            }
          />
          <Route
            path={APP_URL_PATHS.USERPROFILE}
            element={
              <AuthRoute>
                <UserProfile />
              </AuthRoute>
            }
          />
          <Route path={APP_URL_PATHS.LOGOUT} element={<Logout />} />
          <Route path={APP_URL_PATHS.LOGIN} element={<Login />} />
          <Route path={APP_URL_PATHS.REGISTER} element={<Register />} />
          <Route path="*" element={<Navigate to={APP_URL_PATHS.HOME} />} />
        </Routes>
      </Container>
      <Footer />
    </>
  );
};

export default App;
