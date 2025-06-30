import {
  Button,
  Field,
  Fieldset,
  Flex,
  Input,
  NumberInput,
  NativeSelect,
  Textarea,
  ButtonGroup,
  Box,
  Grid,
  Text,
  Span,
  Spinner,
} from "@chakra-ui/react";
import { XCircle, Plus } from "phosphor-react";
import { useEffect, useState, type Dispatch, type FormEvent, type SetStateAction } from "react";
import { toaster } from "../../ui/toaster";
import type { CityPreview, CountryPreview, TravelsListResponse } from "@/utils/types";
import type { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import { useGetCitiesPreview, useGetCountriesPreview } from "@/hooks/useCountries";
import {
  useGetTravel,
  useCreateTravel,
  useUpdateTravel,
  useDeleteTravel,
} from "@/hooks/useTravels";

type FormData = {
  country: CountryPreview | undefined;
  cities: CityPreview[];
  description: string;
  startDate: string;
  duration: string;
};

const emptyForm: FormData = {
  country: undefined,
  cities: [],
  description: "",
  startDate: new Date().toISOString().slice(0, 10),
  duration: "5",
};

type TravelFormProps = {
  fetchTravels: (
    options?: RefetchOptions,
  ) => Promise<QueryObserverResult<TravelsListResponse, Error>>;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  mode: "edit" | "create";
  travelId?: number;
};

export default function TravelForm({
  fetchTravels,
  open,
  setOpen,
  mode,
  travelId,
}: TravelFormProps) {
  const [formData, setFormData] = useState<FormData>(emptyForm);
  const [citySearch, setCitySearch] = useState("");
  const [debouncedCitySearch, setDebouncedCitySearch] = useState(citySearch);
  const [cityFetchStatus, setCityFetchStatus] = useState<
    "NOT FOUND" | "RESULTS FOUND" | "TYPING" | "EMPTY" | "FETCHING" | "ERROR"
  >("EMPTY");

  // Fetch countries
  const {
    data: countries = [],
    isPending: countriesPending,
    error: countriesError,
  } = useGetCountriesPreview();

  // Fetch cities for selected country and search
  const {
    data: cities = [],
    isPending: citiesPending,
    error: citiesError,
  } = useGetCitiesPreview(formData.country?.id, debouncedCitySearch, {
    enabled: !!formData.country?.id && debouncedCitySearch.length >= 2,
  });

  // Fetch travel for edit mode
  const {
    data: travel,
    isPending: travelPending,
    error: travelError,
  } = useGetTravel(travelId as number, { enabled: open && mode === "edit" && !!travelId });

  // Mutations
  const createTravelMutation = useCreateTravel();
  const updateTravelMutation = useUpdateTravel();
  const deleteTravelMutation = useDeleteTravel();
  const isMutating =
    createTravelMutation.isPending ||
    updateTravelMutation.isPending ||
    deleteTravelMutation.isPending;

  // Fill in form with current travel data
  useEffect(() => {
    if (open && mode === "edit" && travel) {
      setFormData({
        country: travel.country
          ? { id: travel.country.id, name: travel.country.name, iso_2: travel.country.iso_2 }
          : undefined,
        cities: travel.cities.map((city: any) => ({
          id: city.id,
          name: city.name,
          countryId: city.countryId,
          state: city.state ?? undefined,
          county: city.county ?? undefined,
        })),
        description: travel.description || "",
        startDate: travel.dateTravel.slice(0, 10) || "",
        duration: travel.duration ? travel.duration.toString() : "0",
      });
    }
    if (!open) {
      setFormData(emptyForm);
    }
  }, [open, mode, travel]);

  // City search status
  useEffect(() => {
    if (!formData.country || citySearch.length === 0) {
      setCityFetchStatus("EMPTY");
      return;
    } else if (citiesError) {
      setCityFetchStatus("ERROR");
    } else if (citySearch.length < 2) {
      setCityFetchStatus("TYPING");
      return;
    } else if (citySearch.length >= 2 && citiesPending) {
      setCityFetchStatus("FETCHING");
    } else if (formData.country && citySearch.length >= 2 && cities.length === 0) {
      setCityFetchStatus("NOT FOUND");
    } else {
      setCityFetchStatus("RESULTS FOUND");
    }
  }, [citySearch, formData.country, cities, citiesPending, citiesError]);

  // Debounce the city search
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedCitySearch(citySearch);
    }, 300); // 0.3 second debounce

    return () => clearTimeout(timeout);
  }, [citySearch]);

  // Handlers
  const handleCountryChange = (countryName: string) => {
    const selectedCountry = countries.find(c => c.name === countryName);
    setFormData(prev => ({
      ...prev,
      country: selectedCountry || undefined,
      cities: [],
    }));
    setCitySearch("");
  };

  const handleCityInput = (inputVal: string) => {
    setCitySearch(inputVal);
  };

  const handleClearCityInput = () => {
    setCitySearch("");
  };

  const handleCityAdd = (cityId: number) => {
    const cityToAdd = cities?.find(c => c.id === cityId);
    if (cityToAdd && !formData.cities.some(c => c.id === cityId)) {
      setFormData(prev => ({
        ...prev,
        cities: [...prev.cities, cityToAdd],
      }));
    }
  };

  const handleCityRemove = (cityId: number) => {
    setFormData(prev => ({
      ...prev,
      cities: prev.cities.filter(city => city.id !== cityId),
    }));
  };

  const handleDeleteTravel = async () => {
    if (!travelId) return;
    deleteTravelMutation.mutate(travelId, {
      onSuccess: () => {
        setFormData(emptyForm);
        setOpen(false);
        fetchTravels();
        toaster.create({
          title: "Travel Deleted",
          description: "Travel deleted successfully",
          type: "success",
        });
      },
      onError: () => {
        toaster.create({
          title: "Travel Error",
          description: "Error deleting travel, please try again.",
          type: "error",
        });
      },
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (isMutating) {
      return;
    }
    if (!formData.country) {
      toaster.create({
        title: "No Country Selected",
        description: "Please select a country before submitting",
        type: "error",
      });
      return;
    }

    const payload = {
      countryId: formData.country.id,
      cityIds: formData.cities.map(city => city.id),
      description: formData.description,
      dateTravel: formData.startDate,
      duration: parseInt(formData.duration),
    };

    if (mode === "edit" && travelId) {
      updateTravelMutation.mutate(
        { travelId, payload },
        {
          onSuccess: () => {
            setFormData(emptyForm);
            setOpen(false);
            fetchTravels();
            toaster.create({
              title: "Travel Updated",
              description: "Travel updated successfully",
              type: "success",
            });
          },
          onError: () => {
            toaster.create({
              title: "Travel Error",
              description: "Error updating travel, please try again.",
              type: "error",
            });
          },
        },
      );
    } else {
      createTravelMutation.mutate(payload, {
        onSuccess: () => {
          setFormData(emptyForm);
          setOpen(false);
          fetchTravels();
          toaster.create({
            title: "Travel Added",
            description: "Travel created successfully",
            type: "success",
          });
        },
        onError: () => {
          toaster.create({
            title: "Travel Error",
            description: "Error creating travel, please try again.",
            type: "error",
          });
        },
      });
    }
  };

  if (mode === "edit" && travelError) {
    return (
      <Flex justifyContent="center" mt="10">
        <Text color="red.500" fontSize="xl">
          Error loading travel: {(travelError as Error).message}
        </Text>
      </Flex>
    );
  }

  if (mode === "edit" && travelPending) {
    return (
      <Flex justifyContent="center" alignItems="center" gap="5" mt="20">
        <Spinner size="lg" />
        <Text fontSize="lg">Loading Travel...</Text>
      </Flex>
    );
  }

  if (countriesError) {
    return (
      <Flex justifyContent="center" mt="20">
        <Text color="red.500" fontSize="xl">
          Error loading Countries: {(countriesError as Error).message}
        </Text>
      </Flex>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <Fieldset.Root disabled={isMutating} size="lg" width="full" maxWidth="2xl" mx="auto">
        <Fieldset.Content>
          <Field.Root>
            <Field.Label>Country</Field.Label>
            {countriesPending ? (
              <Flex align="center" gap="2" mt="2">
                <Spinner size="sm" />
                <Text>Loading cities...</Text>
              </Flex>
            ) : (
              <NativeSelect.Root>
                <NativeSelect.Field
                  placeholder="Select country"
                  value={formData.country?.name || ""}
                  onChange={e => handleCountryChange(e.currentTarget.value)}
                >
                  {countries.map(country => {
                    const name =
                      country.name.length > 38 ? country.name.slice(0, 36) + "..." : country.name;

                    return (
                      <option key={country.id} value={country.name} title={country.name}>
                        {name}
                      </option>
                    );
                  })}
                </NativeSelect.Field>
                <NativeSelect.Indicator />
              </NativeSelect.Root>
            )}
          </Field.Root>

          {formData.country && (
            <>
              <Field.Root>
                <Field.Label>
                  Cities
                  <Span color="GrayText" fontSize="xs" ml="1">
                    - Optional
                  </Span>
                </Field.Label>
                <Input
                  placeholder="Search for a city"
                  type="text"
                  value={citySearch}
                  onChange={e => handleCityInput(e.target.value)}
                />
                {citySearch.length > 0 && (
                  <Button
                    size="2xs"
                    rounded="sm"
                    colorPalette="red"
                    css={{ position: "absolute", bottom: "8px", right: "8px" }}
                    onClick={handleClearCityInput}
                  >
                    X
                  </Button>
                )}
              </Field.Root>

              {cityFetchStatus === "ERROR" && (
                <Text color="red.500" fontSize="xl">
                  Error loading cities, please try again
                </Text>
              )}
              {cityFetchStatus === "TYPING" && (
                <Text>Type 2 or more letters to start searching</Text>
              )}
              {cityFetchStatus === "NOT FOUND" && <Text>No results found</Text>}
              {cityFetchStatus === "FETCHING" && (
                <Flex align="center" gap="2" mt="2">
                  <Spinner size="sm" />
                  <Text>Loading cities...</Text>
                </Flex>
              )}
              {cities && cityFetchStatus === "RESULTS FOUND" && (
                <Box maxHeight="40" overflowY="scroll">
                  <Grid
                    as="ul"
                    templateColumns="1fr"
                    gap="1"
                    lg={{ gridTemplateColumns: "1fr 1fr" }}
                  >
                    {cities.map(city => (
                      <li key={city.id}>
                        <Button
                          type="button"
                          size="xs"
                          width="full"
                          variant="outline"
                          onClick={() => handleCityAdd(city.id)}
                        >
                          <Span
                            style={{
                              maxWidth: "220px",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {`${city.name}${
                              city.county ? `, ${city.county}` : city.state ? `, ${city.state}` : ""
                            }`}
                          </Span>
                          <Plus css={{ marginLeft: "5px" }} />
                        </Button>
                      </li>
                    ))}
                  </Grid>
                </Box>
              )}

              {formData.cities.length > 0 ? (
                <Flex as="ul" alignItems="center" gap="4" wrap="1" flexWrap="wrap">
                  {formData.cities.map(city => (
                    <li key={city.id}>
                      <Button
                        size="xs"
                        rounded="full"
                        variant="solid"
                        colorPalette="cyan"
                        type="button"
                        css={{ textTransform: "capitalize" }}
                        onClick={() => handleCityRemove(city.id)}
                      >
                        {`${city.name}${
                          city.county ? `, ${city.county}` : city.state && `, ${city.state}`
                        }`}
                        <XCircle />
                      </Button>
                    </li>
                  ))}
                </Flex>
              ) : null}
            </>
          )}

          <Field.Root>
            <Field.Label>
              Description{" "}
              <Span color="GrayText" fontSize="xs" ml="1">
                - Optional
              </Span>
            </Field.Label>
            <Textarea
              rows={4}
              value={formData.description}
              onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
            />
          </Field.Root>

          <Field.Root>
            <Field.Label>Start Date</Field.Label>
            <Input
              name="start-date"
              type="date"
              value={formData.startDate}
              onChange={e => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
            />
          </Field.Root>

          <Field.Root>
            <Field.Label>Duration (days)</Field.Label>
            <NumberInput.Root
              value={formData.duration}
              maxWidth="100px"
              max={180}
              onValueChange={e => setFormData(prev => ({ ...prev, duration: e.value }))}
            >
              <NumberInput.Control />
              <NumberInput.Input />
            </NumberInput.Root>
          </Field.Root>
        </Fieldset.Content>
        {mode === "create" ? (
          <ButtonGroup size="sm">
            <Button
              type="submit"
              variant="solid"
              colorPalette="green"
              maxWidth="fit-content"
              px="6"
            >
              Add Travel
            </Button>
            <Button
              type="button"
              variant="solid"
              colorPalette="red"
              maxWidth="fit-content"
              px="6"
              onClick={() => setFormData(emptyForm)}
            >
              Clear Form
            </Button>
          </ButtonGroup>
        ) : (
          <ButtonGroup size="sm">
            <Button
              type="submit"
              variant="solid"
              colorPalette="green"
              size="sm"
              maxWidth="fit-content"
              px="6"
            >
              Save Edits
            </Button>
            <Button
              onClick={handleDeleteTravel}
              type="button"
              variant="solid"
              colorPalette="red"
              maxWidth="fit-content"
              px="6"
            >
              Delete Travel
            </Button>
          </ButtonGroup>
        )}
      </Fieldset.Root>
    </form>
  );
}
