// Travel response types

export type TravelPreview = {
  id: number;
  dateTravel: string;
  createdAt: string;
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
  dateTravel: string;
  duration: number | null;
  createdAt: string;
  updatedAt: string;
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

// Country response types

export type CountryFull = {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  official_name: string;
  iso_2: string;
  iso_num: string | null;
  region: string;
  subregion: string | null;
  continents: string[];
  languages: string[];
  capital: string | null;
  population: number | null;
  landArea: number | null;
  landlocked: boolean;
  independent: boolean;
  currency: string | null;
  timezones: string[];
  latitude: number | null;
  longitude: number | null;
  google_maps_url: string;
};

export type CountryPreview = {
  id: number;
  name: string;
  iso_2: string;
};

export type CountriesPreviewAllResponse = {
  data: CountryPreview[];
};

export type CountriesFullResponse = {
  data: CountryFull[];
  pagination: PaginationResponse;
};

// City response types

export type CityFull = {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  countryId: number;
  population: number | null;
  latitude: number | null;
  longitude: number | null;
  country_iso_2: string;
  country_name: string;
  county: string | null;
  state: string | null;
  timezone: string;
  elevation: string | null;
  digital_elevation: string | null;
};

export type CityPreview = {
  id: number;
  name: string;
  countryId: number;
  county: string | null;
  state: string | null;
};

export type CitiesPreviewAllResponse = {
  data: CityPreview[];
};
