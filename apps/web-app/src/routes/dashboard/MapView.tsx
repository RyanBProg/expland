import { Map, Source, Layer, type MapRef } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import { useEffect, useRef, useState } from "react";
import { Button, Card, Flex, NativeSelect, Field } from "@chakra-ui/react";
import mapStyle from "../../../public/mapStyle2.json";
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
  NorthAmerica: [
    [-170, 5],
    [-50, 83],
  ],
  SouthAmerica: [
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
    <div>
      <StatsDraw flyToBounds={flyToBounds} />

      <Map
        ref={mapRef}
        mapLib={import("maplibre-gl")}
        initialViewState={{ longitude: 0, latitude: 20, zoom: 1 }}
        style={{ width: "100vw", height: "80vh" }}
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
    </div>
  );
}

type StatsDrawProps = {
  flyToBounds: (bounds: any) => void;
};

function StatsDraw({ flyToBounds }: StatsDrawProps) {
  const [drawOpen, setDrawOpen] = useState(false);

  return (
    <div
      css={{
        position: "absolute",
        zIndex: "100",
        width: "350px",
        margin: "20px",
        left: drawOpen ? "0" : "-320px",
        transition: "left 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    >
      <Flex>
        <div css={{ flexGrow: "1" }}>
          <DropdownCard flyToBounds={flyToBounds} />
          <ProgressCard />
        </div>
        <Button
          size="sm"
          variant="subtle"
          aria-label="toggle menu"
          onClick={() => setDrawOpen(prev => !prev)}
          css={{
            display: "flex",
            flexDirection: "column",
            height: "fit-content",
            padding: "10px 5px",
            marginLeft: "20px",
          }}
        >
          <CaretLeft
            size={32}
            css={{
              transform: drawOpen ? "rotate(0deg)" : "rotate(180deg)",
              transition: "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          />
          <span css={{ writingMode: "vertical-lr", transform: "rotate(180deg)" }}>Stats Menu</span>
        </Button>
      </Flex>
    </div>
  );
}

type DropdownCardProps = {
  flyToBounds: (bounds: any) => void;
};

function DropdownCard({ flyToBounds }: DropdownCardProps) {
  return (
    <Card.Root width="full" size="sm" colorPalette="gray">
      <Card.Body gap="4">
        <Field.Root>
          <Field.Label fontSize="xs">Map Area</Field.Label>
          <NativeSelect.Root size="sm" width="full" variant="outline">
            <NativeSelect.Field
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

function ProgressCard() {
  return (
    <Card.Root width="full" size="sm" colorPalette="gray" mt="4">
      <Card.Body gap="2">
        <Flex direction="column" gap="3" justifyItems="center">
          <ProgressBar label="Total Countries" val={38} maxVal={195} />
          <ProgressBar label="Europe" val={20} maxVal={46} />
          <ProgressBar label="North America" val={1} maxVal={23} />
          <ProgressBar label="South America" val={9} maxVal={12} />
          <ProgressBar label="Asia" val={5} maxVal={48} />
          <ProgressBar label="Oceania" val={2} maxVal={14} />
          <ProgressBar label="Africa" val={1} maxVal={54} />
          <ProgressBar label="Antarctica" val={0} maxVal={1} />
        </Flex>
      </Card.Body>
    </Card.Root>
  );
}
