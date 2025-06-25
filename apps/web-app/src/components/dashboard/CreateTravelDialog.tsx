import {
  Button,
  CloseButton,
  Dialog,
  Field,
  Fieldset,
  Flex,
  Input,
  NumberInput,
  Portal,
  NativeSelect,
  Textarea,
  ButtonGroup,
  Box,
  Grid,
  Text,
  Span,
} from "@chakra-ui/react";
import { PlusCircle, XCircle } from "phosphor-react";
import { useEffect, useState, type FormEvent } from "react";
import { toaster } from "../ui/toaster";
import { PlusIcon } from "lucide-react";

type Country = {
  id: number;
  name: string;
};

type City = {
  id: number;
  name: string;
  countryId: number;
  county: string;
  state: string;
};

type FormData = {
  country: Country | null;
  cities: City[];
  description: string;
  startDate: string;
  duration: string;
};

type CityFetchStatus = "NOT FOUND" | "RESULTS FOUND" | "TYPING" | "EMPTY" | "FETCHING";

const emptyForm = {
  country: null,
  cities: [],
  description: "",
  startDate: new Date().toISOString().slice(0, 10),
  duration: "5",
};

export default function CreateTravelDialog({ onSuccess }: { onSuccess: () => Promise<void> }) {
  const [formData, setFormData] = useState<FormData>(emptyForm);
  const [open, setOpen] = useState(false);
  const [fetchedCountries, setFetchedCountries] = useState<Country[]>([]);
  const [fetchedCities, setFetchedCities] = useState<City[] | undefined>(undefined);
  const [citySearch, setCitySearch] = useState("");
  const [cityFetchStatus, setCityFetchStatus] = useState<CityFetchStatus>("EMPTY");

  // fetch countries on mount
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/countries/?detail=summary&limit=all`, {
          method: "GET",
          credentials: "include",
        });
        const { data } = await res.json();

        const countries = data
          .map((country: Country) => ({
            id: country.id,
            name: country.name,
          }))
          .sort((a: Country, b: Country) => a.name.localeCompare(b.name));

        setFetchedCountries(countries);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchCountries();
  }, []);

  // reset selected cities when country is changed
  useEffect(() => {
    setFormData(prev => ({ ...prev, cities: [] }));
    setCitySearch("");
  }, [formData.country]);

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
        const { data } = await res.json();
        const cities = data.sort((a: City, b: City) => a.name.localeCompare(b.name));

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

  const handleCountryChange = (countryName: string) => {
    const selectedCountry = fetchedCountries.find(c => c.name === countryName);
    setFormData(prev => ({
      ...prev,
      country: selectedCountry || null,
      cities: [],
    }));
  };

  const handleCityInput = (inputVal: string) => {
    if (inputVal.length < 2) {
      setFetchedCities([]);
    }

    setCitySearch(inputVal);
  };

  const handleClearCityInput = () => {
    setFetchedCities([]);
    setCitySearch("");
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

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formData.country) {
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
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/account/profile/travels`, {
        method: "POST",
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
      toaster.create({
        title: "Travel Added",
        description: "Travel created successfully",
        type: "success",
      });
    } catch (error) {
      console.error("Error creating travel: ", error);
      toaster.create({
        title: "Travel Error",
        description: "Error creating travel, please try again.",
        type: "error",
      });
    }
  };

  return (
    <Dialog.Root
      lazyMount
      size="full"
      placement="center"
      motionPreset="slide-in-bottom"
      open={open}
      onOpenChange={e => setOpen(e.open)}
    >
      <Dialog.Trigger asChild>
        <Button rounded="2xl" size="md" variant="surface">
          <PlusCircle />
        </Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Create a Travel</Dialog.Title>
              <Dialog.CloseTrigger asChild>
                <CloseButton size="sm" />
              </Dialog.CloseTrigger>
            </Dialog.Header>
            <Dialog.Body>
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
                          {fetchedCountries.map(country => (
                            <option key={country.id} value={country.name}>
                              {country.name}
                            </option>
                          ))}
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
                                    {`${city.name}${
                                      city.county
                                        ? `, ${city.county}`
                                        : city.state && `, ${city.state}`
                                    }`}
                                    <PlusIcon css={{ marginLeft: "5px" }} />
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
                                    city.county
                                      ? `, ${city.county}`
                                      : city.state && `, ${city.state}`
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
                        onChange={e =>
                          setFormData(prev => ({ ...prev, description: e.target.value }))
                        }
                      />
                    </Field.Root>

                    <Field.Root>
                      <Field.Label>Start Date</Field.Label>
                      <Input
                        name="start-date"
                        type="date"
                        value={formData.startDate}
                        onChange={e =>
                          setFormData(prev => ({ ...prev, startDate: e.target.value }))
                        }
                      />
                    </Field.Root>

                    <Field.Root>
                      <Field.Label>Duration (days)</Field.Label>
                      <NumberInput.Root
                        value={formData.duration}
                        onValueChange={e => setFormData(prev => ({ ...prev, duration: e.value }))}
                      >
                        <NumberInput.Control />
                        <NumberInput.Input />
                      </NumberInput.Root>
                    </Field.Root>
                  </Fieldset.Content>
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
                      onClick={_ => setFormData(emptyForm)}
                    >
                      Clear Form
                    </Button>
                  </ButtonGroup>
                </Fieldset.Root>
              </form>
            </Dialog.Body>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
