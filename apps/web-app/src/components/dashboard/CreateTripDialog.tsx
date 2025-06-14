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
} from "@chakra-ui/react";
import { PlusCircle, XCircle } from "phosphor-react";
import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";

type Country = {
  id: number;
  name: string;
};

type City = {
  id: number;
  name: string;
};

type CountriesMap = {
  [name: string]: { id: number };
};

export default function CreateTripDialog() {
  // selection
  const [selectedCity, setSelectedCity] = useState<string | undefined>(undefined);
  // form
  const [country, setCountry] = useState<string | undefined>(undefined);
  const [citiesList, setCitiesList] = useState<string[]>([]);
  const [description, setDescription] = useState<string>("");
  const [startDate, setStartDate] = useState<string>(new Date().toISOString().slice(0, 10));
  const [duration, setDuration] = useState<string>("5");
  // fetched data
  const [fetchedCountries, setFetchedCountries] = useState<Country[]>([]);
  const [fetchedCities, setFetchedCities] = useState<City[]>([]);
  const [countriesMap, setCountriesMap] = useState<CountriesMap>({});

  const updateCities = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedCity(e.currentTarget.value);
  };

  // add a new city to the list of selected cities
  useEffect(() => {
    if (selectedCity && !citiesList.includes(selectedCity)) {
      setCitiesList(prev => [...prev, selectedCity]);
    }
  }, [selectedCity]);

  // get all countries
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/countries`, {
          method: "GET",
          credentials: "include",
        });

        const resJson = await res.json();
        const countries: Country[] = [];

        resJson.data.forEach((country: Country) => {
          countries.push({ id: country.id, name: country.name });
          setCountriesMap(prev => ({ ...prev, [country.name]: { id: country.id } }));
        });

        countries.sort((a, b) => a.name.localeCompare(b.name));

        setFetchedCountries(countries);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCountries();
  }, []);

  // get cities for the selected country
  useEffect(() => {
    const fetchCities = async () => {
      try {
        const query = country ? `/?countryId=${countriesMap[country].id}` : "";
        const res = await fetch(`http://localhost:3000/api/countries/cities${query}`, {
          method: "GET",
          credentials: "include",
        });

        const resJson = await res.json();
        const cities: City[] = [];

        resJson.data.forEach((city: City) => {
          cities.push({ id: city.id, name: city.name });
        });

        cities.sort((a, b) => a.name.localeCompare(b.name));

        console.log(cities);
        setFetchedCities(cities);
      } catch (error) {
        console.log(error);
      }
    };

    if (country) {
      fetchCities();
    }
  }, [country]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      if (!country) {
        throw new Error("No Country Selected");
      }

      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          userId: "c177a183-77a8-48eb-b6bc-6b27ce13ebea",
          countryId: countriesMap[country].id,
          cityIds: [33, 291, 765],
          description: description,
          dateTravel: startDate,
          duration: parseInt(duration),
        }),
      });

      const resJson = await res.json();

      console.log(resJson);
    } catch (error) {
      console.log(error);
    }
  };

  const handleNewCountry = (country: string) => {
    setCountry(country);
    setCitiesList([]);
    setSelectedCity(undefined);
  };

  return (
    <Dialog.Root size="cover" placement="center" motionPreset="slide-in-bottom">
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
              <Dialog.Title>Create a Trip</Dialog.Title>
              <Dialog.CloseTrigger asChild>
                <CloseButton size="sm" />
              </Dialog.CloseTrigger>
            </Dialog.Header>
            <Dialog.Body>
              <form onSubmit={handleSubmit}>
                <Fieldset.Root size="lg">
                  <Fieldset.Content>
                    <Field.Root>
                      <Field.Label>Country</Field.Label>
                      <NativeSelect.Root>
                        <NativeSelect.Field
                          placeholder="Select option"
                          value={country}
                          onChange={e => handleNewCountry(e.currentTarget.value)}
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
                    {country && (
                      <Field.Root>
                        <Field.Label>Cities</Field.Label>
                        <NativeSelect.Root>
                          <NativeSelect.Field
                            placeholder="Select option"
                            value={selectedCity}
                            onChange={e => updateCities(e)}
                          >
                            {fetchedCities.map(city => (
                              <option value={city.name} key={city.id}>
                                {city.name}
                              </option>
                            ))}
                          </NativeSelect.Field>
                          <NativeSelect.Indicator />
                        </NativeSelect.Root>
                        <Flex as="ul" alignItems="center" gap="4" wrap="1" mt="3">
                          {citiesList.map(city => (
                            <li key={city}>
                              <Button
                                size="xs"
                                rounded="full"
                                variant="solid"
                                colorPalette="gray"
                                type="button"
                                css={{ textTransform: "capitalize" }}
                                onClick={() =>
                                  setCitiesList(prev =>
                                    prev.filter(currentCity => currentCity !== city),
                                  )
                                }
                              >
                                {city}
                                <XCircle />
                              </Button>
                            </li>
                          ))}
                        </Flex>
                      </Field.Root>
                    )}
                    <Field.Root>
                      <Field.Label>Description</Field.Label>
                      <Textarea
                        rows={4}
                        value={description}
                        onChange={e => setDescription(e.currentTarget.value)}
                      />
                    </Field.Root>
                    <Field.Root>
                      <Field.Label>Start Date</Field.Label>
                      <Input
                        name="start-date"
                        type="date"
                        value={startDate}
                        onChange={e => setStartDate(e.currentTarget.value)}
                      />
                    </Field.Root>
                    <Field.Root>
                      <Field.Label>Duration (days)</Field.Label>
                      <NumberInput.Root value={duration} onValueChange={e => setDuration(e.value)}>
                        <NumberInput.Control />
                        <NumberInput.Input />
                      </NumberInput.Root>
                    </Field.Root>
                  </Fieldset.Content>
                  <Button
                    type="submit"
                    variant="solid"
                    colorPalette="green"
                    maxWidth="fit-content"
                    px="6"
                  >
                    Add Trip
                  </Button>
                </Fieldset.Root>
              </form>
            </Dialog.Body>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
