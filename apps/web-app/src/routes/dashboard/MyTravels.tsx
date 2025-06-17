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
  Text,
} from "@chakra-ui/react";
import { CaretLeft, CaretRight } from "phosphor-react";
import { useState } from "react";
import ReactCountryFlag from "react-country-flag";

// fetch paginated travels (allow for year filtering and age sorting)

export default function MyTravels() {
  return (
    <Box p="4" maxWidth="4xl" mx="auto">
      <Flex gap="4" justifyContent="center" alignItems="center">
        <Heading as="h1" textAlign="center" my="10" size="4xl">
          My Travels
        </Heading>
        <CreateTravelDialog />
      </Flex>
      <FilterBar />
      <Box>
        <Card.Root size="sm" mt="1" rounded="2xl">
          <Card.Header>
            <Flex justifyContent="space-between">
              <Box>
                <Flex gap="2" alignItems="center">
                  <ReactCountryFlag
                    countryCode="BR"
                    svg
                    style={{
                      width: "16px",
                      height: "16px",
                    }}
                    aria-label="Brazil"
                  />
                  <Card.Title>Brazil</Card.Title>
                </Flex>
                <Card.Description>15th March 2025 - 7 Days</Card.Description>
              </Box>
              <EditTravelDialog />
            </Flex>
          </Card.Header>
          <Card.Body textStyle="md" lineHeight="tall">
            <Flex direction="column">
              <Text fontSize="sm" color="fg.muted">
                Cities
              </Text>
              <Flex gap="3" alignItems="center">
                <Text>Rio</Text>
                <Separator orientation="vertical" height="4" />
                <Text>Sao Paulo</Text>
                <Separator orientation="vertical" height="4" />
                <Text>Iguasu</Text>
              </Flex>
            </Flex>
          </Card.Body>
        </Card.Root>

        <Card.Root size="sm" mt="1" rounded="2xl" maxWidth="4xl" mx="auto">
          <Card.Header>
            <Flex justifyContent="space-between">
              <Box>
                <Flex gap="2" alignItems="center">
                  <ReactCountryFlag
                    countryCode="ES"
                    svg
                    style={{
                      width: "16px",
                      height: "16px",
                    }}
                    aria-label="Spain"
                  />
                  <Card.Title>Spain</Card.Title>
                </Flex>
                <Card.Description>8th June 2025 - 5 Days</Card.Description>
              </Box>
              <EditTravelDialog />
            </Flex>
          </Card.Header>
          <Card.Body textStyle="md" lineHeight="tall">
            <Flex direction="column">
              <Text fontSize="sm" color="fg.muted">
                Cities
              </Text>
              <Flex gap="3" alignItems="center">
                <Text>Madrid</Text>
                <Separator orientation="vertical" height="4" />
                <Text>Valencia</Text>
                <Separator orientation="vertical" height="4" />
                <Text>Barcelona</Text>
                <Separator orientation="vertical" height="4" />
                <Text>Gerona</Text>
              </Flex>
            </Flex>
          </Card.Body>
        </Card.Root>

        <Card.Root size="sm" mt="1" rounded="2xl" maxWidth="4xl" mx="auto" variant="subtle">
          <Card.Header>
            <Flex justifyContent="space-between">
              <Box>
                <Flex gap="2" alignItems="center">
                  <ReactCountryFlag
                    countryCode="FR"
                    svg
                    style={{
                      width: "16px",
                      height: "16px",
                    }}
                    aria-label="France"
                  />
                  <Card.Title>France</Card.Title>
                </Flex>
                <Card.Description>8th August 2025 - 6 Days</Card.Description>
              </Box>
              <EditTravelDialog />
            </Flex>
          </Card.Header>
          <Card.Body textStyle="md" lineHeight="tall"></Card.Body>
        </Card.Root>
      </Box>
      <PaginationComp />
    </Box>
  );
}

function FilterBar() {
  const [selectedYear, setSelectedYear] = useState<string | undefined>(undefined);
  const [selectedSort, setSelectedSort] = useState<string>("newest");

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

function PaginationComp() {
  return (
    <Pagination.Root count={20} pageSize={2} defaultPage={1} width="fit-content" mx="auto" mt="10">
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
