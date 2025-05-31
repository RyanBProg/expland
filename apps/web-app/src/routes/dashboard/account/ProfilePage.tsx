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
  Separator,
  Spacer,
} from "@chakra-ui/react";
import { PencilSimple, MapPin } from "phosphor-react";
import TimelineComp from "@/components/dashboard/timeline/Timeline";
import StatsPreview from "@/components/dashboard/statsBox/StatsPreview";

export default function ProfilePage() {
  return (
    <Grid
      as="main"
      templateColumns="repeat(1, 1fr)"
      gap="8"
      width="vw"
      maxWidth="breakpoint-xl"
      mx="auto"
      p="8"
      lg={{ gridTemplateColumns: "repeat(5, 1fr)", gap: "10", p: "10" }}
    >
      <GridItem
        as="section"
        rounded="2xl"
        width="full"
        minHeight="vh"
        lg={{ gridColumnStart: "4", gridColumnEnd: "6", gridRowStart: "1" }}
      >
        <Card.Root rounded="2xl">
          <StatsPreview mode="profile" />
        </Card.Root>
      </GridItem>
      <GridItem
        as="section"
        width="full"
        minHeight="vh"
        lg={{ gridColumnStart: "1", gridColumnEnd: "4", gridRowStart: "1" }}
      >
        <BioSection />
        <Spacer height="28" />
        <TimelineComp />
      </GridItem>
    </Grid>
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
