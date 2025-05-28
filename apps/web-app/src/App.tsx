import { Grid, GridItem } from "@chakra-ui/react";
import Navbar from "./components/common/navbar/Navbar";
import TimelineComp from "./components/dashboard/timeline/Timeline";
import StatsPreview from "./components/dashboard/statsBox/statsPreview";
import Feed from "./components/dashboard/feed/Feed";

function App() {
  return (
    <>
      <Navbar />
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
          height="vh"
          lg={{ gridColumnStart: "4", gridColumnEnd: "6", gridRowStart: "1" }}
        >
          <StatsPreview />
        </GridItem>
        <GridItem
          as="section"
          width="full"
          height="vh"
          lg={{ gridColumnStart: "1", gridColumnEnd: "4", gridRowStart: "1" }}
        >
          <TimelineComp />
          <Feed />
        </GridItem>
      </Grid>
    </>
  );
}

export default App;
