import "maplibre-gl/dist/maplibre-gl.css";
import { Card, Flex } from "@chakra-ui/react";
import ProgressBar from "@/components/dashboard/progress/ProgressBar";
import type { TravelPreview } from "@/utils/types";

type ProgressCardType = {
  fetchedTravels: TravelPreview[];
};

export default function ProgressCard({ fetchedTravels }: ProgressCardType) {
  const today = new Date();
  const prevTravels = new Set(
    fetchedTravels.filter(travel => new Date(travel.dateTravel) <= today),
  );
  const prevTravelsArr = Array.from(prevTravels);

  const europeCount = prevTravelsArr.filter(travel =>
    travel.country?.continents.includes("Europe"),
  );
  const northAmericaCount = prevTravelsArr.filter(travel =>
    travel.country?.continents.includes("North America"),
  );
  const southAmericaCount = prevTravelsArr.filter(travel =>
    travel.country?.continents.includes("South America"),
  );
  const asiaCount = prevTravelsArr.filter(travel => travel.country?.continents.includes("Asia"));
  const oceaniaCount = prevTravelsArr.filter(travel =>
    travel.country?.continents.includes("Oceania"),
  );
  const africaCount = prevTravelsArr.filter(travel =>
    travel.country?.continents.includes("Africa"),
  );
  const antarctica = prevTravelsArr.filter(travel =>
    travel.country?.continents.includes("Antarctica"),
  );

  return (
    <Card.Root width="full" size="sm" colorPalette="gray" mt="4" rounded="xl">
      <Card.Body gap="2">
        <Flex direction="column" gap="3" justifyItems="center">
          <ProgressBar label="Total Countries" val={prevTravelsArr.length} maxVal={195} size="sm" />
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
