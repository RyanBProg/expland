import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "./components/ui/provider";
import { createBrowserRouter, RouterProvider } from "react-router";
import NotFound from "./routes/error/NotFound";
import DashboardLayout from "./layouts/DashboardLayout";
import SiteLayout from "./layouts/SiteLayout";
import Dashboard from "./routes/dashboard/Dashboard";
import ManageAccountPage from "./routes/dashboard/account/ManageAccountPage";
import ProfilePage from "./routes/dashboard/account/ProfilePage";
import LoginPage from "./routes/login/LoginPage";
import RegisterPage from "./routes/register/RegisterPage";
import Home from "./routes/Home";
import ContactPage from "./routes/contact/ContactPage";
import PoliciesPage from "./routes/policies/Policies";
import ViewTripsPage from "./routes/dashboard/trips/ViewTripsPage";
import CreateTripPage from "./routes/dashboard/trips/CreateTripPage";

const router = createBrowserRouter([
  {
    path: "/",
    Component: SiteLayout,
    errorElement: <NotFound />,
    children: [
      { index: true, Component: Home },
      { path: "login", Component: LoginPage },
      { path: "register", Component: RegisterPage },
      { path: "contact", Component: ContactPage },
      { path: "policies", Component: PoliciesPage },
    ],
  },

  {
    path: "dashboard",
    Component: DashboardLayout,
    errorElement: <NotFound />,
    children: [
      { index: true, Component: Dashboard },
      { path: "account", Component: ManageAccountPage },
      { path: "account/profile", Component: ProfilePage },
      { path: "trips", Component: ViewTripsPage },
      { path: "trips/new-trip", Component: CreateTripPage },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
);
