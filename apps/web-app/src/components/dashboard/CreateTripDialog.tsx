import {
  Button,
  ButtonGroup,
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
import { useEffect, useState, type ChangeEvent } from "react";

export default function CreateTripDialog() {
  const [selectedCountry, setSelectedCountry] = useState<string | undefined>(undefined);
  const [citiesList, setCitiesList] = useState<string[]>([]);
  const [selectedCity, setSelectedCity] = useState<string | undefined>(undefined);
  const [description, setDescription] = useState<string>("");
  const [startDate, setStartDate] = useState<string>(new Date().toISOString().slice(0, 10));
  const [duration, setDuration] = useState<string>("5");

  const updateCities = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedCity(e.currentTarget.value);
  };

  useEffect(() => {
    if (selectedCity && !citiesList.includes(selectedCity)) {
      setCitiesList(prev => [...prev, selectedCity]);
    }
  }, [selectedCity]);

  return (
    <Dialog.Root size="cover" placement="center" motionPreset="slide-in-bottom">
      <Dialog.Trigger asChild>
        <Button rounded="2xl" size="lg" variant="surface">
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
              <Fieldset.Root size="lg">
                <Fieldset.Content>
                  <Field.Root>
                    <Field.Label>Country</Field.Label>
                    <NativeSelect.Root>
                      <NativeSelect.Field
                        placeholder="Select option"
                        value={selectedCountry}
                        onChange={e => setSelectedCountry(e.currentTarget.value)}
                      >
                        <option value="france">🇫🇷 France</option>
                        <option value="spain">🇪🇸 Spain</option>
                      </NativeSelect.Field>
                      <NativeSelect.Indicator />
                    </NativeSelect.Root>
                  </Field.Root>

                  {selectedCountry && (
                    <Field.Root>
                      <Field.Label>Cities</Field.Label>

                      <NativeSelect.Root>
                        <NativeSelect.Field
                          placeholder="Select option"
                          value={selectedCity}
                          onChange={e => updateCities(e)}
                        >
                          <option value="paris">Paris</option>
                          <option value="lyon">Lyon</option>
                          <option value="nice">Nice</option>
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
            </Dialog.Body>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
