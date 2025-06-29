import { Box, Flex, Heading, Text, Spinner } from "@chakra-ui/react";
import { ArrowDown, ArrowUp } from "phosphor-react";
import { useEffect, useState } from "react";
import type { TravelFull, TravelsListResponse } from "@/utils/types";
import TravelDialog from "@/components/dashboard/my-travels/TravelDialog";
import PaginationSection from "@/components/common/PaginationSection";
import FilterbarSection from "@/components/dashboard/my-travels/FilterbarSection";
import TravelCard from "@/components/dashboard/my-travels/TravelCard";

export default function MyTravels() {
  const [fetchedTravels, setFetchedTravels] = useState<TravelFull[]>([]);
  const [selectedYear, setSelectedYear] = useState<string | undefined>(undefined);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const today = new Date();

  const fetchTravels = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(
        `http://localhost:3000/api/account/profile/travels/?page=${currentPage}&year=${selectedYear}`,
        {
          method: "GET",
          credentials: "include",
        },
      );
      const { data, pagination } = (await res.json()) as TravelsListResponse;

      setFetchedTravels(data);
      setTotalItems(pagination.totalItems);
    } catch (error) {
      console.error("Error fetching travels: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTravels();
  }, [currentPage, selectedYear]);

  const futureTravel = fetchedTravels.filter(travel => new Date(travel.dateTravel) > today);
  const previousTravel = fetchedTravels.filter(travel => new Date(travel.dateTravel) <= today);

  return (
    <Box p="4" maxWidth="4xl" mx="auto">
      <Flex gap="4" justifyContent="center" alignItems="center">
        <Heading as="h1" textAlign="center" my="10" size="4xl">
          My Travels
        </Heading>
        <TravelDialog onSuccess={fetchTravels} mode="create" />
      </Flex>
      <FilterbarSection selectedYear={selectedYear} setSelectedYear={setSelectedYear} />
      {isLoading && (
        <div
          css={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "100px",
          }}
        >
          <Spinner size="xl" />
        </div>
      )}
      {!isLoading && fetchedTravels.length > 0 ? (
        <>
          <Flex direction="column" gap="1">
            {futureTravel.length > 0 &&
              futureTravel.map(travel => (
                <TravelCard
                  key={travel.id}
                  travel={travel}
                  fetchTravels={fetchTravels}
                  variant="outline"
                />
              ))}

            {futureTravel.length > 0 && previousTravel.length > 0 && (
              <Flex my="6" justifyContent="space-around">
                <Flex justifyContent="end" alignItems="center" gap="2">
                  <Text color="fg.muted" fontSize="sm">
                    Future Travels
                  </Text>
                  <ArrowUp size={12} />
                </Flex>
                <Flex justifyContent="start" alignItems="center" gap="2">
                  <ArrowDown size={12} />
                  <Text color="fg.muted" fontSize="sm">
                    Past Travels
                  </Text>
                </Flex>
              </Flex>
            )}

            {previousTravel.length > 0 &&
              previousTravel.map(travel => (
                <TravelCard
                  key={travel.id}
                  travel={travel}
                  fetchTravels={fetchTravels}
                  variant="subtle"
                />
              ))}
          </Flex>

          <PaginationSection
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalItems={totalItems}
          />
        </>
      ) : (
        <Flex direction="column" alignItems="center" pt="20" md={{ pt: "28" }}>
          <Text fontSize="3xl">No Travels Found</Text>
          <Text color="fg.muted" mb="10" textAlign="center">
            We couldn't find any travels.
            <br /> Start adding your trips here.
          </Text>
          <ArrowDown css={{ marginBottom: "20px" }} />
          <TravelDialog onSuccess={fetchTravels} mode="create" />
        </Flex>
      )}
    </Box>
  );
}
