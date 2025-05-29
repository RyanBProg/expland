import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "./components/ui/provider";
import { createBrowserRouter, RouterProvider } from "react-router";
import NotFound from "./routes/error/NotFound";
import DashboardLayout from "./layouts/DashboardLayout";
import SiteLayout from "./layouts/SiteLayout";
import Dashboard from "./routes/dashboard/Dashboard";

const router = createBrowserRouter([
  {
    path: "/",
    Component: SiteLayout,
    errorElement: <NotFound />,
    children: [
      { index: true, Component: () => <>Home</> },
      // { path: "settings", Component: SomeOtherComponent },
    ],
  },

  {
    path: "dashboard",
    Component: DashboardLayout,
    errorElement: <NotFound />,
    children: [
      { index: true, Component: Dashboard },
      // { path: "settings", Component: SomeOtherComponent },
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
