import { Map, Source, Layer, type MapRef } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import { useEffect, useRef, useState } from "react";
import { Spinner } from "@chakra-ui/react";
import mapStyle from "../../../src/data/mapStyle.json";
import type { TravelPreview, TravelsPreviewResponse } from "@/utils/types";
import StatsDrawer from "@/components/dashboard/map-view/StatsDrawer";

const geoJsonUrl =
  "https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson";

export default function MapView() {
  const [geoData, setGeoData] = useState(null);
  const [fetchedTravels, setFetchedTravels] = useState<TravelPreview[]>([]);

  const fetchTravels = async () => {
    try {
      const res = await fetch(`http://localhost:3000/api/account/profile/travels-preview`, {
        method: "GET",
        credentials: "include",
      });
      const { data } = (await res.json()) as TravelsPreviewResponse;

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

  const travelledCodes = new Set(fetchedTravels.map(travel => travel.country?.iso_2));
  const travelledCodesArr = Array.from(travelledCodes).filter(
    (code): code is string => typeof code === "string",
  );

  return (
    <>
      <StatsDrawer flyToBounds={flyToBounds} fetchedTravels={fetchedTravels} />

      {geoData ? (
        <Map
          ref={mapRef}
          mapLib={import("maplibre-gl")}
          initialViewState={{ longitude: 0, latitude: 20, zoom: 1 }}
          style={{ width: "100vw", height: "calc(100vh - 72px)" }}
          mapStyle={mapStyle}
          maxZoom={5}
          minZoom={1}
        >
          <Source id="countries" type="geojson" data={geoData}>
            {travelledCodesArr.length > 0 && (
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
            )}
          </Source>
        </Map>
      ) : (
        <div
          css={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "calc(100vh - 72px)",
          }}
        >
          <Spinner size="xl" />
        </div>
      )}
    </>
  );
}
