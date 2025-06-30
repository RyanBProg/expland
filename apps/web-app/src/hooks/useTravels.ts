import type {
  SubmitTravelPayload,
  TravelResponse,
  TravelsListResponse,
  TravelsPreviewResponse,
} from "@/utils/types";
import { useMutation, useQuery, type UseQueryOptions } from "@tanstack/react-query";

const fetchTravelsPreview = async () => {
  const res = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/api/account/profile/travels-preview`,
    {
      method: "GET",
      credentials: "include",
    },
  );
  if (!res.ok) throw new Error("Failed to fetch travels");

  const { data } = (await res.json()) as TravelsPreviewResponse;
  return data;
};

export const useGetTravelsPreview = () => {
  return useQuery({
    queryKey: ["travels-preview"],
    queryFn: fetchTravelsPreview,
    refetchOnWindowFocus: false,
  });
};

const fetchTravels = async (currentPage: number, selectedYear?: string) => {
  const res = await fetch(
    `${
      import.meta.env.VITE_BACKEND_URL
    }/api/account/profile/travels/?page=${currentPage}&year=${selectedYear}`,
    {
      method: "GET",
      credentials: "include",
    },
  );
  if (!res.ok) throw new Error("Failed to fetch travels");

  const resJson = (await res.json()) as TravelsListResponse;
  return resJson;
};

export const useGetTravels = (currentPage: number, selectedYear?: string) => {
  return useQuery({
    queryKey: ["travels", currentPage, selectedYear],
    queryFn: () => fetchTravels(currentPage, selectedYear),
    staleTime: 30 * 60 * 1000, // 30 minutes
    refetchOnWindowFocus: false,
  });
};

const fetchTravel = async (travelId: number) => {
  const res = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/api/account/profile/travels/${travelId}`,
    {
      method: "GET",
      credentials: "include",
    },
  );
  if (!res.ok) throw new Error("Failed to fetch travel");

  const { data } = (await res.json()) as TravelResponse;
  return data;
};

export const useGetTravel = (
  travelId: number,
  options?: Omit<UseQueryOptions<any, Error, any>, "queryKey" | "queryFn">,
) => {
  return useQuery({
    queryKey: ["travel", travelId],
    queryFn: () => fetchTravel(travelId),
    staleTime: 30 * 60 * 1000, // 30 minutes
    refetchOnWindowFocus: false,
    enabled: !!travelId, // always require a travelId
    ...options, // allow override/extension
  });
};

const handleDeleteTravel = async (travelId: number) => {
  const res = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/api/account/profile/travels/${travelId}`,
    {
      method: "DELETE",
      credentials: "include",
    },
  );
  if (!res.ok) throw new Error("Failed to delete travel");

  return true;
};

export const useDeleteTravel = () => {
  return useMutation({
    mutationFn: handleDeleteTravel,
  });
};

const createTravel = async (payload: SubmitTravelPayload) => {
  const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/account/profile/travels`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to create travel");

  return res.json();
};

export const useCreateTravel = () => useMutation({ mutationFn: createTravel });

const updateTravel = async ({
  travelId,
  payload,
}: {
  travelId: number;
  payload: SubmitTravelPayload;
}) => {
  const res = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/api/account/profile/travels/${travelId}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(payload),
    },
  );
  if (!res.ok) throw new Error("Failed to update travel");

  return res.json();
};

export const useUpdateTravel = () => useMutation({ mutationFn: updateTravel });
