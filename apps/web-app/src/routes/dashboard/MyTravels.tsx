import CreateTravelDialog from "@/components/dashboard/CreateTravelDialog";
import EditTravelDialog from "@/components/dashboard/EditTravelDialog";
import {
  Box,
  ButtonGroup,
  Card,
  Flex,
  Heading,
  IconButton,
  NativeSelect,
  Pagination,
  Separator,
  Stack,
  Text,
} from "@chakra-ui/react";
import { CaretLeft, CaretRight } from "phosphor-react";
import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import ReactCountryFlag from "react-country-flag";

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

export default function MyTravels() {
  const [fetchedTravels, setFetchedTravels] = useState<Travel[]>([]);
  const [selectedYear, setSelectedYear] = useState<string | undefined>(undefined);
  const [selectedSort, setSelectedSort] = useState<string>("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const today = new Date();

  const fetchTravels = async () => {
    try {
      const res = await fetch(
        `http://localhost:3000/api/account/profile/travels/?page=${currentPage}&sort=${selectedSort}&year=${selectedYear}`,
        {
          method: "GET",
          credentials: "include",
        },
      );
      const { data, pagination } = await res.json();

      setFetchedTravels(data);
      setTotalItems(pagination.totalItems);
    } catch (error) {
      console.error("Error fetching travels: ", error);
    }
  };

  useEffect(() => {
    fetchTravels();
  }, [currentPage, selectedYear, selectedSort]);

  return (
    <Box p="4" maxWidth="4xl" mx="auto">
      <Flex gap="4" justifyContent="center" alignItems="center">
        <Heading as="h1" textAlign="center" my="10" size="4xl">
          My Travels
        </Heading>
        <CreateTravelDialog />
      </Flex>
      <FilterBar
        selectedYear={selectedYear}
        setSelectedYear={setSelectedYear}
        selectedSort={selectedSort}
        setSelectedSort={setSelectedSort}
      />
      {fetchedTravels.length > 0 && (
        <>
          <Box>
            {fetchedTravels.map(travel => (
              <Card.Root
                key={travel.id}
                size="sm"
                mt="1"
                rounded="2xl"
                variant={new Date(travel.dateTravel) > today ? "outline" : "subtle"}
              >
                <Card.Header>
                  <Flex justifyContent="space-between">
                    <Box>
                      <Flex gap="2" alignItems="center">
                        <ReactCountryFlag
                          countryCode={travel.country.iso_2}
                          svg
                          style={{
                            width: "16px",
                            height: "16px",
                          }}
                          aria-label={travel.country.name}
                        />
                        <Card.Title>{travel.country.name}</Card.Title>
                      </Flex>
                      <Card.Description>
                        {travel.dateTravel.substring(8, 10)}/{travel.dateTravel.substring(5, 7)}/
                        {travel.dateTravel.substring(0, 4)} - {travel.duration} Days
                      </Card.Description>
                    </Box>
                    <EditTravelDialog travelId={travel.id} onSuccess={fetchTravels} />
                  </Flex>
                </Card.Header>
                <Card.Body textStyle="md" lineHeight="tall">
                  {travel.cities.length > 0 && (
                    <Flex direction="column">
                      <Text fontSize="sm" color="fg.muted">
                        Cities
                      </Text>
                      <Stack
                        gap="4"
                        direction="row"
                        separator={<Separator orientation="vertical" height="26px" />}
                      >
                        {travel.cities.map(city => (
                          <>
                            <Text>{city.name}</Text>
                          </>
                        ))}
                      </Stack>
                    </Flex>
                  )}
                </Card.Body>
              </Card.Root>
            ))}
          </Box>

          <PaginationComp
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalItems={totalItems}
          />
        </>
      )}
    </Box>
  );
}

type FilterbarProps = {
  selectedYear: string | undefined;
  setSelectedYear: Dispatch<SetStateAction<string | undefined>>;
  selectedSort: string;
  setSelectedSort: Dispatch<SetStateAction<string>>;
};

function FilterBar({
  selectedYear,
  setSelectedYear,
  selectedSort,
  setSelectedSort,
}: FilterbarProps) {
  return (
    <Flex justify="space-between" mb="5" gap="4">
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

      <NativeSelect.Root width="150px">
        <NativeSelect.Field
          value={selectedSort}
          onChange={e => setSelectedSort(e.currentTarget.value)}
        >
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
        </NativeSelect.Field>
        <NativeSelect.Indicator />
      </NativeSelect.Root>
    </Flex>
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
