export type TravelPreview = {
  id: number;
  dateTravel: Date;
  createdAt: Date;
  country: {
    id: number;
    name: string;
    iso_2: string;
    continents: string[];
    independent: boolean;
  } | null;
};

export type TravelFull = {
  cities: {
    id: number;
    countryId: number;
    name: string;
    latitude: number | null;
    longitude: number | null;
    country_iso_2: string;
    county: string | null;
    state: string | null;
  }[];
  id: number;
  description: string | null;
  dateTravel: Date;
  duration: number | null;
  createdAt: Date;
  updatedAt: Date;
  country: {
    id: number;
    name: string;
    iso_2: string;
    continents: string[];
    independent: boolean;
    latitude: number | null;
    longitude: number | null;
  } | null;
};

export type PaginationResponse = {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
};

export type TravelResponse = {
  data: TravelFull;
};

export type TravelsListResponse = {
  data: TravelFull[];
  pagination: PaginationResponse;
};

export type TravelsPreviewResponse = {
  data: TravelPreview[];
};
