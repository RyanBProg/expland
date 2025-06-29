import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "./components/ui/provider";
import { createBrowserRouter, RouterProvider } from "react-router";
import NotFound from "./routes/error/NotFound";
import DashboardLayout from "./layouts/DashboardLayout";
import SiteLayout from "./layouts/SiteLayout";
import Dashboard from "./routes/dashboard/Dashboard";
import ManageAccount from "./routes/dashboard/account/ManageAccount";
import MyProfile from "./routes/dashboard/account/MyProfile";
import Login from "./routes/Login";
import Register from "./routes/Register";
import Home from "./routes/Home";
import Contact from "./routes/Contact";
import Policies from "./routes/Policies";
import MyTravels from "./routes/dashboard/MyTravels";
import { Toaster } from "./components/ui/toaster";
import MapView from "./routes/dashboard/MapView";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    Component: SiteLayout,
    errorElement: <NotFound />,
    children: [
      { index: true, Component: Home },
      { path: "login", Component: Login },
      { path: "register", Component: Register },
      { path: "contact", Component: Contact },
      { path: "policies", Component: Policies },
    ],
  },

  {
    path: "dashboard",
    Component: DashboardLayout,
    errorElement: <NotFound />,
    children: [
      { index: true, Component: Dashboard },
      { path: "account", Component: ManageAccount },
      { path: "account/profile", Component: MyProfile },
      { path: "trips", Component: MyTravels },
      { path: "map-view", Component: MapView },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider>
        <RouterProvider router={router} />
        <Toaster />
      </Provider>
    </QueryClientProvider>
  </StrictMode>,
);
