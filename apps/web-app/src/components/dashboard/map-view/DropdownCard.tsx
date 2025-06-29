import "maplibre-gl/dist/maplibre-gl.css";
import type { RefObject } from "react";
import { Card, NativeSelect, Field } from "@chakra-ui/react";

const boundsByContinent = {
  World: [
    [-180, -60],
    [180, 85],
  ],
  Europe: [
    [-31, 34],
    [40, 72],
  ],
  Africa: [
    [-20, -35],
    [55, 38],
  ],
  Asia: [
    [25, -10],
    [180, 80],
  ],
  "North America": [
    [-170, 5],
    [-50, 83],
  ],
  "South America": [
    [-82, -56],
    [-34, 13],
  ],
  Oceania: [
    [110, -50],
    [180, 0],
  ],
} as const;

type Continent = keyof typeof boundsByContinent;

type DropdownCardProps = {
  flyToBounds: (bounds: any) => void;
  dropdownRef: RefObject<HTMLSelectElement | null>;
};

export default function DropdownCard({ flyToBounds, dropdownRef }: DropdownCardProps) {
  return (
    <Card.Root width="full" size="sm" colorPalette="gray" rounded="xl">
      <Card.Body gap="4">
        <Field.Root>
          <Field.Label fontSize="xs">Map Area</Field.Label>
          <NativeSelect.Root size="sm" width="full" variant="outline">
            <NativeSelect.Field
              ref={dropdownRef}
              onChange={e => flyToBounds(boundsByContinent[e.target.value as Continent])}
            >
              {Object.keys(boundsByContinent).map(cont => (
                <option key={cont} value={cont}>
                  {cont}
                </option>
              ))}
            </NativeSelect.Field>
            <NativeSelect.Indicator />
          </NativeSelect.Root>
        </Field.Root>

        <Field.Root>
          <Field.Label fontSize="xs">Display Type</Field.Label>
          <NativeSelect.Root size="sm" width="full" variant="outline">
            <NativeSelect.Field
              onChange={e => flyToBounds(boundsByContinent[e.target.value as Continent])}
            >
              <option value="travelled">Travelled</option>
              <option value="wishlist">Wishlist</option>
            </NativeSelect.Field>
            <NativeSelect.Indicator />
          </NativeSelect.Root>
        </Field.Root>
      </Card.Body>
    </Card.Root>
  );
}
