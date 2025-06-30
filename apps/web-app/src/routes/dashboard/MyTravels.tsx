import { Box, Flex, Heading, Text, Spinner } from "@chakra-ui/react";
import { ArrowDown, ArrowUp } from "phosphor-react";
import { useState } from "react";
import TravelDialog from "@/components/dashboard/my-travels/TravelDialog";
import PaginationSection from "@/components/common/PaginationSection";
import FilterbarSection from "@/components/dashboard/my-travels/FilterbarSection";
import TravelCard from "@/components/dashboard/my-travels/TravelCard";
import { useGetTravels } from "@/hooks/useTravels";

export default function MyTravels() {
  const [selectedYear, setSelectedYear] = useState<string | undefined>(undefined);
  const [currentPage, setCurrentPage] = useState(1);
  const today = new Date();
  const { data, isPending, error, refetch } = useGetTravels(currentPage, selectedYear);

  const fetchedTravels = data?.data ?? [];
  const totalItems = data?.pagination?.totalItems ?? 0;

  const futureTravel = fetchedTravels.filter(travel => new Date(travel.dateTravel) > today);
  const previousTravel = fetchedTravels.filter(travel => new Date(travel.dateTravel) <= today);

  let content = null;

  if (isPending) {
    content = (
      <Flex justify="center" align="center" minH="60vh">
        <Spinner size="xl" />
      </Flex>
    );
  } else if (error) {
    content = (
      <Flex direction="column" alignItems="center" pt="20">
        <Text fontSize="3xl" color="red.500">
          Error loading travels: {(error as Error).message}
        </Text>
      </Flex>
    );
  } else if (fetchedTravels.length === 0) {
    content = (
      <Flex direction="column" alignItems="center" pt="20">
        <Text fontSize="3xl">No Travels Found</Text>
        <Text color="fg.muted" mb="10" textAlign="center">
          We couldn't find any travels.
          <br /> Add your trips to view them.
        </Text>
      </Flex>
    );
  } else {
    content = (
      <>
        <Flex direction="column" gap="1">
          {futureTravel.length > 0 &&
            futureTravel.map(travel => (
              <TravelCard
                key={travel.id}
                travel={travel}
                fetchTravels={refetch}
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
              <TravelCard key={travel.id} travel={travel} fetchTravels={refetch} variant="subtle" />
            ))}
        </Flex>

        <PaginationSection
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalItems={totalItems}
        />
      </>
    );
  }

  return (
    <Box p="4" maxWidth="4xl" mx="auto">
      <Flex gap="4" justifyContent="center" alignItems="center">
        <Heading as="h1" textAlign="center" my="10" size="4xl">
          My Travels
        </Heading>
        <TravelDialog fetchTravels={refetch} mode="create" />
      </Flex>
      <FilterbarSection selectedYear={selectedYear} setSelectedYear={setSelectedYear} />
      {content}
    </Box>
  );
}
