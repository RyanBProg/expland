import {
  Box,
  Button,
  Card,
  Flex,
  Grid,
  GridItem,
  Heading,
  Text,
  Avatar,
  HStack,
  Separator,
  Badge,
  Icon,
} from "@chakra-ui/react";
import { PencilSimple, MapPin, Suitcase, Lightning, ChartLineUp, Clock } from "phosphor-react";
import TimelineComp from "@/components/dashboard/timeline/Timeline";
import ProgressBar from "@/components/dashboard/progress/ProgressBar";
import ReactCountryFlag from "react-country-flag";

export default function ProfilePage() {
  return (
    <Box maxW="breakpoint-xl" mx="auto" p={{ base: "4", lg: "8" }}>
      {/* Profile Header */}
      <Grid templateColumns={{ base: "1fr", lg: "repeat(5, 1fr)" }} gap="8">
        <GridItem colSpan={{ base: 1, lg: 3 }} order={{ base: 1, lg: 1 }}>
          <BioSection />
        </GridItem>

        <GridItem colSpan={{ base: 1, lg: 2 }} order={{ base: 2, lg: 2 }}>
          <Card.Root rounded="2xl" p="10">
            <Flex justifyContent="center" gap="4" alignItems="center" mb="10">
              <Box p="4" rounded="full" backgroundColor="yellow.400" color="white">
                <Suitcase size={44} />
              </Box>
              <Flex direction="column" gap="1">
                <Text fontSize="1rem" fontWeight="500">
                  Ryan Bowler
                </Text>
                <Badge variant="outline" size="lg" width="fit-content" colorPalette="yellow">
                  Jet Setter
                </Badge>
              </Flex>
            </Flex>
            <Box>
              <ProgressBar label="Total Countries" val={38} maxVal={195} size="xl" />
            </Box>
          </Card.Root>
        </GridItem>
      </Grid>

      {/* Main Content Grid */}
      <Grid templateColumns={{ base: "1fr", lg: "repeat(5, 1fr)" }} gap="8">
        {/* Bio and Location Section */}
        <GridItem colSpan={{ base: 1, lg: 3 }} order={{ base: 1, lg: 1 }}>
          <TimelineComp />
        </GridItem>

        {/* Stats Preview Section */}
        <GridItem colSpan={{ base: 1, lg: 2 }} order={{ base: 2, lg: 2 }}>
          <Card.Root rounded="2xl">
            <Flex direction="column" gap="10" pt="10" pb="5">
              <Flex direction="column" gap="3" justifyItems="center" px="10">
                <ProgressBar label="Europe" val={20} maxVal={46} />
                <ProgressBar label="North America" val={1} maxVal={23} />
                <ProgressBar label="South America" val={9} maxVal={12} />
                <ProgressBar label="Asia" val={5} maxVal={48} />
                <ProgressBar label="Oceania" val={2} maxVal={14} />
                <ProgressBar label="Africa" val={1} maxVal={54} />
                <ProgressBar label="Antarctica" val={0} maxVal={1} />
              </Flex>

              <Flex direction="column" gap="5" px="5">
                <Card.Root size="sm" rounded="2xl">
                  <HStack ml="7">
                    <Icon>
                      <ChartLineUp size={32} />
                    </Icon>
                    <Flex direction="column">
                      <Card.Header>
                        <Heading size="sm" color="fg.muted">
                          Total Days Travelled
                        </Heading>
                      </Card.Header>
                      <Card.Body fontSize="1.5rem" fontWeight="700" pt="0.5">
                        {124}
                      </Card.Body>
                    </Flex>
                  </HStack>
                </Card.Root>

                <Card.Root size="sm" rounded="2xl">
                  <HStack ml="7">
                    <Icon>
                      <Clock size={32} />
                    </Icon>
                    <Flex direction="column">
                      <Card.Header>
                        <Heading size="sm" color="fg.muted">
                          Average Duration (days)
                        </Heading>
                      </Card.Header>
                      <Card.Body fontSize="1.5rem" fontWeight="700" pt="0.5">
                        {5.8}
                      </Card.Body>
                    </Flex>
                  </HStack>
                </Card.Root>

                <Card.Root size="sm" rounded="2xl">
                  <HStack ml="7">
                    <Icon>
                      <Lightning size={32} />
                    </Icon>
                    <Flex direction="column">
                      <Card.Header>
                        <Heading size="sm" color="fg.muted">
                          Travel Streak (years)
                        </Heading>
                      </Card.Header>
                      <Card.Body fontSize="1.5rem" fontWeight="700" pt="0.5">
                        {6}
                      </Card.Body>
                    </Flex>
                  </HStack>
                </Card.Root>

                <Grid templateColumns="repeat(2, 1fr)" gap="6">
                  <Card.Root size="sm" rounded="2xl">
                    <Flex direction="column">
                      <Card.Header>
                        <Heading size="sm" color="fg.muted">
                          Favorite Country
                        </Heading>
                      </Card.Header>
                      <Card.Body fontSize="1.5rem" fontWeight="700" pt="0.5">
                        <Box mt="2">
                          <ReactCountryFlag
                            countryCode="ES"
                            svg
                            style={{
                              width: "44px",
                              height: "44px",
                            }}
                            aria-label="Spain"
                          />
                        </Box>
                      </Card.Body>
                    </Flex>
                  </Card.Root>

                  <Card.Root size="sm" rounded="2xl">
                    <Flex direction="column">
                      <Card.Header>
                        <Heading size="sm" color="fg.muted">
                          Most Visited
                        </Heading>
                      </Card.Header>
                      <Card.Body fontSize="1.5rem" fontWeight="700" pt="0.5">
                        <Box mt="2">
                          <ReactCountryFlag
                            countryCode="AU"
                            svg
                            style={{
                              width: "44px",
                              height: "44px",
                            }}
                            aria-label="France"
                          />
                        </Box>
                      </Card.Body>
                    </Flex>
                  </Card.Root>
                </Grid>
              </Flex>
            </Flex>
          </Card.Root>
        </GridItem>
      </Grid>
    </Box>
  );
}

const BioSection = () => {
  return (
    <Flex direction="column" gap="6">
      <Flex
        direction={{ base: "column", md: "row" }}
        gap={{ base: "6", md: "10" }}
        alignItems="center"
      >
        <Flex gap="5" alignItems="center" grow="1">
          <Avatar.Root size="2xl">
            <Avatar.Image src="https://i.pravatar.cc/150?u=a" />
            <Avatar.Fallback />
          </Avatar.Root>
          <Flex gap="0" direction="column">
            <Heading>Ryan Bowler</Heading>
            <Text color="fg.muted">ryan_bowler_9</Text>
          </Flex>
        </Flex>
        <Flex gap={{ base: "10", md: "1" }} direction={{ base: "row", md: "column" }}>
          <Text>
            <strong>124</strong> followers
          </Text>
          <Text>
            <strong>89</strong> following
          </Text>
        </Flex>
        <Button
          size="sm"
          colorScheme="cyan"
          rounded="xl"
          width={{ base: "full", md: "fit-content" }}
          maxWidth="60"
        >
          Follow
        </Button>
      </Flex>

      <Flex direction="column" gap="2">
        {/* Bio */}
        <Box>
          <Flex justify="space-between" align="center" mb="1">
            <Text color="gray.500" fontWeight="medium">
              Bio
            </Text>
            <Button size="sm" variant="ghost" rounded="full">
              <PencilSimple /> Edit
            </Button>
          </Flex>
          <Text>
            Full-stack developer by day, globe trotter by night. Always seeking the next adventure
            and coding from different corners of the world. Building @nomad-hub to connect travelers
            worldwide.
          </Text>
        </Box>

        <Separator mt="2" />

        {/* Location */}
        <Box>
          <Flex justify="space-between" align="center" mb="1">
            <Text color="gray.500" fontWeight="medium">
              Location
            </Text>
            <Button size="sm" variant="ghost" rounded="full">
              <PencilSimple /> Edit
            </Button>
          </Flex>
          <Flex align="center" gap="2">
            <MapPin />
            <Text>Currently in Barcelona, Spain</Text>
          </Flex>
        </Box>
      </Flex>
    </Flex>
  );
};
