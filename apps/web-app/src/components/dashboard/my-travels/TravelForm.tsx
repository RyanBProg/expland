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
} from "@chakra-ui/react";
import { XCircle } from "phosphor-react";
import { useEffect, useState, type Dispatch, type FormEvent, type SetStateAction } from "react";
import { toaster } from "../../ui/toaster";
import { Plus } from "phosphor-react";
import type {
  CitiesPreviewAllResponse,
  CityPreview,
  CountriesPreviewAllResponse,
  CountryPreview,
  TravelResponse,
} from "@/utils/types";

type FormData = {
  country: CountryPreview | undefined;
  cities: CityPreview[];
  description: string;
  startDate: string;
  duration: string;
};

type CityFetchStatus = "NOT FOUND" | "RESULTS FOUND" | "TYPING" | "EMPTY" | "FETCHING";

const emptyForm = {
  country: undefined,
  cities: [],
  description: "",
  startDate: new Date().toISOString().slice(0, 10),
  duration: "5",
};

type TravelFormProps = {
  onSuccess: () => Promise<void>;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  mode: "edit" | "create";
  travelId?: number;
};

export default function TravelForm({ onSuccess, open, setOpen, mode, travelId }: TravelFormProps) {
  const [formData, setFormData] = useState<FormData>(emptyForm);
  const [fetchedCountries, setFetchedCountries] = useState<CountryPreview[]>([]);
  const [fetchedCities, setFetchedCities] = useState<CityPreview[]>([]);
  const [citySearch, setCitySearch] = useState("");
  const [cityFetchStatus, setCityFetchStatus] = useState<CityFetchStatus>("EMPTY");

  // fill in form with current travel data
  useEffect(() => {
    const fetchTravel = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/account/profile/travels/${travelId}`, {
          method: "GET",
          credentials: "include",
        });

        const { data } = (await res.json()) as TravelResponse;

        setFormData({
          country: data.country
            ? { id: data.country.id, name: data.country.name, iso_2: data.country.iso_2 }
            : undefined,
          cities: data.cities.map((city: any) => ({
            id: city.id,
            name: city.name,
            countryId: city.countryId,
            state: city.state ?? undefined,
            county: city.county ?? undefined,
          })),
          description: data.description || "",
          startDate: data.dateTravel.slice(0, 10) || "",
          duration: data.duration ? data.duration.toString() : "0",
        });
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    if (open && mode === "edit" && travelId) {
      fetchTravel();
    }
  }, [open, mode, travelId]);

  // fetch countries on mount
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/countries/?detail=summary&limit=all`, {
          method: "GET",
          credentials: "include",
        });
        const { data } = (await res.json()) as CountriesPreviewAllResponse;
        const countries = data.sort((a, b) => a.name.localeCompare(b.name));
        setFetchedCountries(countries);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchCountries();
  }, []);

  // fetch new cities when typing in search
  useEffect(() => {
    if (!formData.country) return;
    if (citySearch.length < 2 && citySearch.length > 0) {
      setCityFetchStatus("TYPING");
      return;
    } else if (citySearch.length === 0) {
      setCityFetchStatus("EMPTY");
      return;
    }

    setCityFetchStatus("FETCHING");

    const fetchCities = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/api/countries/cities/?countryId=${
            formData.country!.id
          }&detail=summary&limit=all&search=${citySearch}`,
          {
            method: "GET",
            credentials: "include",
          },
        );
        const { data } = (await res.json()) as CitiesPreviewAllResponse;
        const cities = data.sort((a, b) => a.name.localeCompare(b.name));

        if (cities.length === 0) {
          setCityFetchStatus("NOT FOUND");
        } else {
          setCityFetchStatus("RESULTS FOUND");
        }

        setFetchedCities(cities);
      } catch (error) {
        console.error("Error fetching cities:", error);
        setCityFetchStatus("NOT FOUND");
      }
    };

    const timeout = setTimeout(() => {
      fetchCities();
    }, 1000);

    return () => clearTimeout(timeout);
  }, [citySearch, formData.country]);

  // clear form on close
  useEffect(() => {
    if (!open) {
      setFormData(emptyForm);
    }
  }, [open]);

  const handleCountryChange = (countryName: string) => {
    const selectedCountry = fetchedCountries.find(c => c.name === countryName);
    setFormData(prev => ({
      ...prev,
      country: selectedCountry || undefined,
      cities: [],
    }));
    setCitySearch("");
  };

  const handleCityInput = (inputVal: string) => {
    setCitySearch(inputVal);
    if (inputVal.length < 2) {
      setFetchedCities([]);
    }
  };

  const handleClearCityInput = () => {
    setCitySearch("");
    setFetchedCities([]);
  };

  const handleCityAdd = (cityId: number) => {
    const cityToAdd = fetchedCities?.find(c => c.id === cityId);
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
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/account/profile/travels/${travelId}`,
        {
          method: "DELETE",
          credentials: "include",
        },
      );

      if (!res.ok) {
        throw Error("Error deleting travel, please try again.");
      }

      setFormData(emptyForm);
      setOpen(false);
      onSuccess();
      toaster.create({
        title: "Travel Deleted",
        description: "Travel deleted successfully",
        type: "success",
      });
    } catch (error) {
      console.error("Error deleting travel: ", error);
      toaster.create({
        title: "Travel Error",
        description: "Error deleting travel, please try again.",
        type: "error",
      });
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formData.country) {
      toaster.create({
        title: "No Country Selected",
        description: "Please select a country before submitting",
        type: "error",
      });
      return;
    }

    const payload = {
      userId: "c177a183-77a8-48eb-b6bc-6b27ce13ebea",
      countryId: formData.country.id,
      cityIds: formData.cities.map(city => city.id),
      description: formData.description,
      dateTravel: formData.startDate,
      duration: parseInt(formData.duration),
    };

    try {
      // set url and method based on dialog mode
      let url = "";
      let method = "";
      if (mode === "edit") {
        url = `${import.meta.env.VITE_BACKEND_URL}/api/account/profile/travels/${travelId}`;
        method = "PUT";
      } else {
        url = `${import.meta.env.VITE_BACKEND_URL}/api/account/profile/travels`;
        method = "POST";
      }
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        throw Error(data.message || "Unkown error");
      }

      setFormData(emptyForm);
      setOpen(false);
      onSuccess();
      if (mode === "create") {
        toaster.create({
          title: "Travel Added",
          description: "Travel created successfully",
          type: "success",
        });
      } else {
        toaster.create({
          title: "Travel Updated",
          description: "Travel updated successfully",
          type: "success",
        });
      }
    } catch (error) {
      console.error("Error submitting travel: ", error);
      toaster.create({
        title: "Travel Error",
        description: "Error submitting travel, please try again.",
        type: "error",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Fieldset.Root size="lg" width="full" maxWidth="2xl" mx="auto">
        <Fieldset.Content>
          <Field.Root>
            <Field.Label>Country</Field.Label>
            <NativeSelect.Root>
              <NativeSelect.Field
                placeholder="Select country"
                value={formData.country?.name || ""}
                onChange={e => handleCountryChange(e.currentTarget.value)}
              >
                {fetchedCountries.map(country => {
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

              {cityFetchStatus === "TYPING" && (
                <Text>Type 2 or more letters to start searching</Text>
              )}
              {cityFetchStatus === "NOT FOUND" && <Text>No results found</Text>}
              {cityFetchStatus === "FETCHING" && <Text>Loading...</Text>}
              {fetchedCities && cityFetchStatus === "RESULTS FOUND" ? (
                <Box maxHeight="40" overflowY="scroll">
                  <Grid
                    as="ul"
                    templateColumns="1fr"
                    gap="1"
                    lg={{ gridTemplateColumns: "1fr 1fr" }}
                  >
                    {fetchedCities.map(city => (
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
              ) : null}

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
