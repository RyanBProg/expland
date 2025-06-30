import type { TravelFull, TravelsListResponse } from "@/utils/types";
import { Badge, Box, Card, Flex, Text } from "@chakra-ui/react";
import ReactCountryFlag from "react-country-flag";
import TravelDialog from "./TravelDialog";
import type { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";

type TravelCardProps = {
  travel: TravelFull;
  fetchTravels: (
    options?: RefetchOptions,
  ) => Promise<QueryObserverResult<TravelsListResponse, Error>>;
  variant: "outline" | "elevated" | "subtle";
};

export default function TravelCard({ travel, fetchTravels, variant }: TravelCardProps) {
  return (
    <Card.Root key={travel.id} size="sm" mt="1" rounded="2xl" variant={variant}>
      <Card.Header>
        <Flex justifyContent="space-between">
          <Box>
            <Flex gap="2" alignItems="center">
              {travel.country && (
                <ReactCountryFlag
                  countryCode={travel.country.iso_2}
                  svg
                  style={{
                    width: "16px",
                    height: "16px",
                  }}
                  aria-label={travel.country.name}
                />
              )}
              <Card.Title>{travel.country?.name || "Country Removed"}</Card.Title>
            </Flex>
            <Card.Description>
              {travel.dateTravel.substring(8, 10)}/{travel.dateTravel.substring(5, 7)}/
              {travel.dateTravel.substring(0, 4)} - {travel.duration} Days
            </Card.Description>
          </Box>
          <TravelDialog fetchTravels={fetchTravels} mode="edit" travelId={travel.id} />
        </Flex>
      </Card.Header>
      <Card.Body textStyle="md" lineHeight="tall">
        {travel.cities.length > 0 && (
          <Flex direction="column">
            <Text fontSize="sm" color="fg.muted">
              Cities
            </Text>
            <Flex flexWrap="wrap" gap="2" direction="row" mt="1">
              {travel.cities.map(city => (
                <Badge key={city.id} variant="solid" colorPalette="cyan">
                  {city.name}
                </Badge>
              ))}
            </Flex>
          </Flex>
        )}
      </Card.Body>
    </Card.Root>
  );
}
