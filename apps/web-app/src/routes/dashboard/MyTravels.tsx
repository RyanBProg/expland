import {
  Badge,
  Box,
  ButtonGroup,
  Card,
  Flex,
  Heading,
  IconButton,
  NativeSelect,
  Pagination,
  Text,
  Spinner,
} from "@chakra-ui/react";
import { ArrowDown, ArrowUp, CaretLeft, CaretRight } from "phosphor-react";
import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import ReactCountryFlag from "react-country-flag";
import type { TravelFull, TravelsListResponse } from "@/utils/types";
import TravelDialog from "@/components/dashboard/TravelDialog";

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
      <FilterBar selectedYear={selectedYear} setSelectedYear={setSelectedYear} />
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

          <PaginationComp
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

type FilterbarProps = {
  selectedYear: string | undefined;
  setSelectedYear: Dispatch<SetStateAction<string | undefined>>;
};

function FilterBar({ selectedYear, setSelectedYear }: FilterbarProps) {
  return (
    <div css={{ marginBottom: "20px" }}>
      <NativeSelect.Root width="150px">
        <NativeSelect.Field
          placeholder="Filter by Year"
          value={selectedYear}
          onChange={e => setSelectedYear(e.currentTarget.value)}
        >
          <option value="2021">2021</option>
          <option value="2022">2022</option>
          <option value="2023">2023</option>
          <option value="2024">2024</option>
          <option value="2025">2025</option>
        </NativeSelect.Field>
        <NativeSelect.Indicator />
      </NativeSelect.Root>
    </div>
  );
}

type PaginationProps = {
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  totalItems: number;
};

function PaginationComp({ currentPage, setCurrentPage, totalItems }: PaginationProps) {
  return (
    <Pagination.Root
      count={totalItems}
      pageSize={10}
      page={currentPage}
      onPageChange={e => setCurrentPage(e.page)}
      width="fit-content"
      mx="auto"
      mt="10"
    >
      <ButtonGroup gap="4" size="sm" variant="ghost">
        <Pagination.PrevTrigger asChild>
          <IconButton>
            <CaretLeft size={32} />
          </IconButton>
        </Pagination.PrevTrigger>
        <Pagination.PageText />
        <Pagination.NextTrigger asChild>
          <IconButton>
            <CaretRight size={32} />
          </IconButton>
        </Pagination.NextTrigger>
      </ButtonGroup>
    </Pagination.Root>
  );
}

type TravelCardProps = {
  travel: TravelFull;
  fetchTravels: () => Promise<void>;
  variant: "outline" | "elevated" | "subtle";
};

function TravelCard({ travel, fetchTravels, variant }: TravelCardProps) {
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
          <TravelDialog onSuccess={fetchTravels} mode="edit" travelId={travel.id} />
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
