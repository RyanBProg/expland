import { Map, Source, Layer, type MapRef } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import { useEffect, useRef, useState, type RefObject } from "react";
import { Button, Card, Flex, NativeSelect, Field } from "@chakra-ui/react";
import mapStyle from "../../../public/mapStyle.json";
import { CaretLeft } from "phosphor-react";
import ProgressBar from "@/components/dashboard/progress/ProgressBar";

const geoJsonUrl =
  "https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson";

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

type City = {
  id: number;
  name: string;
};

export type Travel = {
  id: number;
  description: string;
  dateTravel: string;
  duration: number;
  country: {
    id: number;
    name: string;
    iso_2: string;
    continents: string[];
  };
  cities: City[];
};

export default function MapView() {
  const [geoData, setGeoData] = useState(null);
  const [fetchedTravels, setFetchedTravels] = useState<Travel[]>([]);

  const fetchTravels = async () => {
    try {
      const res = await fetch(`http://localhost:3000/api/account/profile/travels`, {
        method: "GET",
        credentials: "include",
      });
      const { data } = await res.json();

      setFetchedTravels(data);
    } catch (error) {
      console.error("Error fetching travels: ", error);
    }
  };

  useEffect(() => {
    fetchTravels();

    fetch(geoJsonUrl)
      .then(res => res.json())
      .then(setGeoData);
  }, []);

  const mapRef = useRef<MapRef | null>(null);

  const flyToBounds = (bounds: any) => {
    mapRef.current?.getMap().fitBounds(bounds, { padding: 40, duration: 1200 });
  };

  const travelledCodes = new Set(fetchedTravels.map(travel => travel.country.iso_2));
  const travelledCodesArr = Array.from(travelledCodes);

  return (
    <>
      <StatsDrawer flyToBounds={flyToBounds} fetchedTravels={fetchedTravels} />

      <Map
        ref={mapRef}
        mapLib={import("maplibre-gl")}
        initialViewState={{ longitude: 0, latitude: 20, zoom: 1 }}
        style={{ width: "100vw", height: "calc(100vh - 72px)" }}
        mapStyle={mapStyle}
        maxZoom={5}
        minZoom={1}
      >
        {geoData && (
          <Source id="countries" type="geojson" data={geoData}>
            <Layer
              id="country-fills"
              type="fill"
              paint={{
                "fill-color": [
                  "match",
                  ["get", "ISO3166-1-Alpha-2"],
                  travelledCodesArr,
                  "rgb(53, 163, 55)", // Highlighted countries
                  "rgba(0,0,0,0)",
                ],
                "fill-opacity": 0.5,
              }}
            />
          </Source>
        )}
      </Map>
    </>
  );
}

type StatsDrawerProps = {
  flyToBounds: (bounds: any) => void;
  fetchedTravels: Travel[];
};

function StatsDrawer({ flyToBounds, fetchedTravels }: StatsDrawerProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const dropdownRef = useRef<HTMLSelectElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // focus menu when open
  useEffect(() => {
    if (drawerOpen) {
      dropdownRef.current?.focus();
    } else {
      toggleRef.current?.focus();
    }
  }, [drawerOpen]);

  return (
    <div
      css={{
        position: "absolute",
        display: "flex",
        zIndex: "100",
        width: "350px",
        margin: "20px",
        gap: "20px",
        left: drawerOpen ? "0" : "-320px",
        transition: "left 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    >
      <aside
        aria-hidden={!drawerOpen}
        aria-label="Travel statistics"
        inert={!drawerOpen ? true : undefined}
        css={{ flexGrow: "1" }}
      >
        <DropdownCard flyToBounds={flyToBounds} dropdownRef={dropdownRef} />
        <ProgressCard fetchedTravels={fetchedTravels} />
      </aside>
      <Button
        ref={toggleRef}
        size="sm"
        colorPalette="gray"
        variant="surface"
        rounded="xl"
        aria-label={drawerOpen ? "Close stats menu" : "Open stats menu"}
        aria-expanded={drawerOpen}
        aria-controls="stats-drawer"
        onClick={() => setDrawerOpen(prev => !prev)}
        css={{
          display: "flex",
          flexDirection: "column",
          height: "fit-content",
          padding: "10px 5px",
        }}
      >
        <CaretLeft
          size={32}
          css={{
            transform: drawerOpen ? "rotate(0deg)" : "rotate(180deg)",
            transition: "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        />
        <span css={{ writingMode: "vertical-lr", transform: "rotate(180deg)" }}>Stats Menu</span>
      </Button>
    </div>
  );
}

type DropdownCardProps = {
  flyToBounds: (bounds: any) => void;
  dropdownRef: RefObject<HTMLSelectElement | null>;
};

function DropdownCard({ flyToBounds, dropdownRef }: DropdownCardProps) {
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

type ProgressCardType = {
  fetchedTravels: Travel[];
};

function ProgressCard({ fetchedTravels }: ProgressCardType) {
  const today = new Date();
  const prevTravels = new Set(
    fetchedTravels.filter(travel => new Date(travel.dateTravel) <= today),
  );
  const prevTravelsArr = Array.from(prevTravels);

  const europeCount = prevTravelsArr.filter(travel => travel.country.continents.includes("Europe"));
  const northAmericaCount = prevTravelsArr.filter(travel =>
    travel.country.continents.includes("North America"),
  );
  const southAmericaCount = prevTravelsArr.filter(travel =>
    travel.country.continents.includes("South America"),
  );
  const asiaCount = prevTravelsArr.filter(travel => travel.country.continents.includes("Asia"));
  const oceaniaCount = prevTravelsArr.filter(travel =>
    travel.country.continents.includes("Oceania"),
  );
  const africaCount = prevTravelsArr.filter(travel => travel.country.continents.includes("Africa"));
  const antarctica = prevTravelsArr.filter(travel =>
    travel.country.continents.includes("Antarctica"),
  );

  return (
    <Card.Root width="full" size="sm" colorPalette="gray" mt="4" rounded="xl">
      <Card.Body gap="2">
        <Flex direction="column" gap="3" justifyItems="center">
          <ProgressBar label="Total Countries" val={prevTravels.size} maxVal={195} size="sm" />
          <ProgressBar label="Europe" val={europeCount.length} maxVal={46} size="sm" />
          <ProgressBar label="North America" val={northAmericaCount.length} maxVal={23} size="sm" />
          <ProgressBar label="South America" val={southAmericaCount.length} maxVal={12} size="sm" />
          <ProgressBar label="Asia" val={asiaCount.length} maxVal={48} size="sm" />
          <ProgressBar label="Oceania" val={oceaniaCount.length} maxVal={14} size="sm" />
          <ProgressBar label="Africa" val={africaCount.length} maxVal={54} size="sm" />
          <ProgressBar label="Antarctica" val={antarctica.length} maxVal={1} size="sm" />
        </Flex>
      </Card.Body>
    </Card.Root>
  );
}
