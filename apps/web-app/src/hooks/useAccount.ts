import type { AccountResponse, AccountUpdateResponse } from "@/utils/types";
import { useQuery, useMutation } from "@tanstack/react-query";

export function useAccount() {
  return useQuery({
    queryKey: ["account"],
    queryFn: async () => {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/account`, {
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to fetch account");
      const resJson = (await res.json()) as AccountResponse;
      return resJson.data;
    },
  });
}

export const useUpdateUsername = (username: string) => {
  return useMutation({
    mutationFn: async () => {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/account/username`, {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username }),
      });
      if (!res.ok) throw new Error((await res.json()).message || "Failed to update username");
      return (await res.json()) as AccountUpdateResponse;
    },
  });
};

export const useUpdateGivenName = (givenName: string) => {
  return useMutation({
    mutationFn: async () => {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/account/given-name`, {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ givenName }),
      });
      if (!res.ok) throw new Error((await res.json()).message || "Failed to update given name");
      return (await res.json()) as AccountUpdateResponse;
    },
  });
};

export const useUpdateFamilyName = (familyName: string) => {
  return useMutation({
    mutationFn: async () => {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/account/family-name`, {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ familyName }),
      });
      if (!res.ok) throw new Error((await res.json()).message || "Failed to update family name");
      return (await res.json()) as AccountUpdateResponse;
    },
  });
};

export function useUpdatePassword() {
  return useMutation({
    mutationFn: async (payload: { currentPassword: string; newPassword: string }) => {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/account/password`, {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error((await res.json()).message || "Failed to update password");
      return (await res.json()) as AccountUpdateResponse;
    },
  });
}
