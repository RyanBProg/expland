import { useMutation, useQuery } from "@tanstack/react-query";

export const useLogout = () => {
  return useMutation({
    mutationFn: async () => {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to log out");
      return await res.json();
    },
  });
};

export const useLogoutAll = () => {
  return useMutation({
    mutationFn: async () => {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/logout-on-all`, {
        method: "POST",
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to log out");
      return await res.json();
    },
  });
};

export function useAuthAccount() {
  return useQuery({
    queryKey: ["account-check"],
    queryFn: async () => {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/account`, {
        credentials: "include",
      });
      if (!res.ok) throw new Error("Not authenticated");
      return (await res.json()).data;
    },
    retry: false,
    staleTime: 0,
  });
}
