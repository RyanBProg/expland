import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import type {
  CountriesPreviewAllResponse,
  CitiesPreviewAllResponse,
  CityPreview,
} from "@/utils/types";

// Fetch all countries
const fetchCountriesPreview = async (): Promise<CountriesPreviewAllResponse["data"]> => {
  const res = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/api/countries/?detail=summary&limit=all`,
    {
      method: "GET",
      credentials: "include",
    },
  );
  if (!res.ok) throw new Error("Failed to fetch countries");

  const { data } = (await res.json()) as CountriesPreviewAllResponse;
  // sorted alphabetically
  return data.sort((a, b) => a.name.localeCompare(b.name));
};

export const useGetCountriesPreview = () =>
  useQuery({
    queryKey: ["countries-preview"],
    queryFn: fetchCountriesPreview,
    staleTime: 24 * 60 * 60 * 1000, // 24 hours
    refetchOnWindowFocus: false,
  });

// Fetch cities for a country (with search)
const fetchCitiesPreview = async ({
  countryId,
  search = "",
}: {
  countryId?: number;
  search?: string;
}): Promise<CitiesPreviewAllResponse["data"]> => {
  if (!countryId) {
    return [];
  }

  const res = await fetch(
    `${
      import.meta.env.VITE_BACKEND_URL
    }/api/countries/cities/?countryId=${countryId}&detail=summary&limit=all&search=${search}`,
    {
      method: "GET",
      credentials: "include",
    },
  );
  if (!res.ok) throw new Error("Failed to fetch cities");

  const { data } = (await res.json()) as CitiesPreviewAllResponse;
  // sorted alphabetically
  return data.sort((a, b) => a.name.localeCompare(b.name));
};

export const useGetCitiesPreview = (
  countryId?: number,
  search?: string,
  options?: Omit<UseQueryOptions<CityPreview[], Error>, "queryKey" | "queryFn">,
) =>
  useQuery<CityPreview[], Error>({
    queryKey: ["cities", countryId, search],
    queryFn: () => fetchCitiesPreview({ countryId, search }),
    staleTime: 24 * 60 * 60 * 1000,
    refetchOnWindowFocus: false,
    enabled: !!countryId && !!search && search.length >= 2,
    ...options,
  });
