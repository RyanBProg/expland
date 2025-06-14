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
import { useEffect, useState, type FormEvent } from "react";

type Country = {
  id: number;
  name: string;
};

type City = {
  id: number;
  name: string;
  countryId: number;
};

type FormData = {
  country: Country | null;
  cities: City[];
  description: string;
  startDate: string;
  duration: string;
};

export default function CreateTripDialog() {
  const [formData, setFormData] = useState<FormData>({
    country: null,
    cities: [],
    description: "",
    startDate: new Date().toISOString().slice(0, 10),
    duration: "5",
  });

  const [fetchedCountries, setFetchedCountries] = useState<Country[]>([]);
  const [fetchedCities, setFetchedCities] = useState<City[]>([]);

  // Fetch countries on mount
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

  // Fetch cities when country changes
  useEffect(() => {
    const fetchCities = async () => {
      if (!formData.country) return;

      try {
        const res = await fetch(
          `http://localhost:3000/api/countries/cities/?countryId=${formData.country.id}&detail=summary&limit=all`,
          {
            method: "GET",
            credentials: "include",
          },
        );
        const { data } = await res.json();

        const cities = data
          .map((city: City) => ({
            id: city.id,
            name: city.name,
            countryId: city.countryId,
          }))
          .sort((a: City, b: City) => a.name.localeCompare(b.name));

        setFetchedCities(cities);
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    };

    fetchCities();
  }, [formData.country]);

  const handleCountryChange = (countryName: string) => {
    const selectedCountry = fetchedCountries.find(c => c.name === countryName);
    setFormData(prev => ({
      ...prev,
      country: selectedCountry || null,
      cities: [], // Reset cities when country changes
    }));
  };

  const handleCityAdd = (cityName: string) => {
    const cityToAdd = fetchedCities.find(c => c.name === cityName);
    if (cityToAdd && !formData.cities.some(c => c.id === cityToAdd.id)) {
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
      console.log(data);
      // TODO: Add success handling
    } catch (error) {
      console.error("Error creating trip:", error);
      // TODO: Add error handling
    }
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
                      <Field.Root>
                        <Field.Label>Cities</Field.Label>
                        <NativeSelect.Root>
                          <NativeSelect.Field
                            placeholder="Select city"
                            onChange={e => handleCityAdd(e.currentTarget.value)}
                          >
                            {fetchedCities.map(city => (
                              <option key={city.id} value={city.name}>
                                {city.name}
                              </option>
                            ))}
                          </NativeSelect.Field>
                          <NativeSelect.Indicator />
                        </NativeSelect.Root>
                        <Flex as="ul" alignItems="center" gap="4" wrap="1" mt="3">
                          {formData.cities.map(city => (
                            <li key={city.id}>
                              <Button
                                size="xs"
                                rounded="full"
                                variant="solid"
                                colorPalette="gray"
                                type="button"
                                css={{ textTransform: "capitalize" }}
                                onClick={() => handleCityRemove(city.id)}
                              >
                                {city.name}
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
