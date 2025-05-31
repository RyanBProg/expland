import {
  Flex,
  Card,
  Heading,
  HStack,
  Image,
  Box,
  Icon,
  Grid,
  Button,
  Text,
  Separator,
  Badge,
} from "@chakra-ui/react";
import { Tooltip } from "@/components/ui/tooltip";
import ProgressBar from "../progress/ProgressBar";
import {
  AirplaneTilt,
  BookmarkSimple,
  ChartLine,
  ChartLineUp,
  Clock,
  Lightning,
  PlusCircle,
  Suitcase,
} from "phosphor-react";
import ReactCountryFlag from "react-country-flag";

type Props = {
  mode?: "default" | "profile";
};

export default function StatsPreview({ mode = "default" }: Props) {
  return (
    <Flex direction="column" gap="10" pt="10" pb="5">
      <Flex px="10" justifyContent="center" gap="4" alignItems="center">
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

      <Box px="10">
        <ProgressBar label="Total Countries" val={38} maxVal={195} size="xl" />
      </Box>

      {mode === "default" && (
        <Grid templateColumns="repeat(4, 1fr)" gap="6" px="10">
          <Tooltip openDelay={300} content="Add a new trip">
            <Button rounded="2xl" size="lg" variant="surface">
              <PlusCircle />
            </Button>
          </Tooltip>
          <Tooltip openDelay={300} content="View my trips">
            <Button rounded="2xl" size="lg" variant="surface">
              <AirplaneTilt />
            </Button>
          </Tooltip>
          <Tooltip openDelay={300} content="View travel stats">
            <Button rounded="2xl" size="lg" variant="surface">
              <ChartLine />
            </Button>
          </Tooltip>
          <Tooltip openDelay={300} content="View saved trips">
            <Button rounded="2xl" size="lg" variant="surface">
              <BookmarkSimple />
            </Button>
          </Tooltip>
        </Grid>
      )}

      <Separator />

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
        {mode === "default" && (
          <Button
            minHeight="250px"
            overflow="hidden"
            p="0"
            variant="ghost"
            border="0"
            position="relative"
            rounded="2xl"
            className="group"
          >
            <Image
              src="/images/explore-preview.jpg"
              objectFit="cover"
              position="absolute"
              width="full"
              height="full"
              transition="transform 800ms ease-in-out"
              _groupHover={{
                transform: "scale(1.04)",
              }}
            />
            <Box
              position="absolute"
              top="0"
              left="0"
              right="0"
              bottom="0"
              bg="blackAlpha.400"
              transition="background 800ms ease-in-out"
              _groupHover={{
                bg: "blackAlpha.500",
              }}
            />
            <Flex
              position="absolute"
              gap="2"
              p="8"
              width="full"
              height="full"
              justify="center"
              align="center"
            >
              <Text
                fontSize="5xl"
                fontWeight="black"
                color="white"
                textAlign="center"
                letterSpacing="tight"
                lineHeight="1"
                textShadow="lg"
              >
                Explore New <br /> Destinations
              </Text>
            </Flex>
          </Button>
        )}
      </Flex>
    </Flex>
  );
}
