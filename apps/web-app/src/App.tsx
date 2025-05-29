import { Button, Card, Grid, GridItem, Image, Text, Flex, Box, Badge } from "@chakra-ui/react";
import TimelineComp from "./components/dashboard/timeline/Timeline";
import StatsPreview from "./components/dashboard/statsBox/StatsPreview";
import Feed from "./components/dashboard/feed/Feed";

function App() {
  return (
    <>
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
            <StatsPreview />
          </Card.Root>
        </GridItem>
        <GridItem
          as="section"
          width="full"
          minHeight="vh"
          lg={{ gridColumnStart: "1", gridColumnEnd: "4", gridRowStart: "1" }}
        >
          <Button
            height="100px"
            width="full"
            overflow="hidden"
            p="0"
            mb="10"
            variant="ghost"
            border="0"
            position="relative"
            rounded="2xl"
            className="group"
          >
            <Image
              src="/images/feed-banner.jpg"
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
              direction="column"
              width="full"
              height="full"
              justify="center"
              align="center"
            >
              <Text
                fontSize="3xl"
                fontWeight="black"
                color="white"
                textAlign="center"
                letterSpacing="tight"
                lineHeight="1"
                textShadow="lg"
              >
                Plan Your Next Trip
              </Text>
              <Flex gap="3">
                <Badge colorPalette="green">Pro Membership</Badge>
                <Text>Join Today</Text>
              </Flex>
            </Flex>
          </Button>
          <TimelineComp />
          <Feed />
        </GridItem>
      </Grid>
    </>
  );
}

export default App;
