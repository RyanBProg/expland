import { useAuthAccount } from "@/hooks/useAuth";
import { Navigate, Outlet } from "react-router";

export default function ProtectedRoute() {
  const { data: account, isLoading } = useAuthAccount();

  if (isLoading) return null; // or a spinner

  // if not authenticated, redirect to login
  if (!account) return <Navigate to="/login" replace />;

  // if authenticated, render child routes
  return <Outlet />;
}
