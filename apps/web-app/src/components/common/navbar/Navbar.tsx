import {
  Avatar,
  Box,
  Circle,
  defineStyle,
  Float,
  Flex,
  ButtonGroup,
  Button,
  Text,
  IconButton,
} from "@chakra-ui/react";
import { AirplaneInFlight, AirplaneTakeoff, Compass, House } from "phosphor-react";

const ringCss = defineStyle({
  outlineWidth: "2px",
  outlineColor: "colorPalette.500",
  outlineOffset: "2px",
  outlineStyle: "solid",
});

export default function Navbar() {
  return (
    <header>
      <Flex as="nav" justify="space-between" p="4">
        <ButtonGroup as="ul" variant="subtle">
          <Button rounded="2xl">
            <House />
            <Text hideBelow="md">Home</Text>
          </Button>
          <Button rounded="2xl">
            <AirplaneInFlight />
            <Text hideBelow="md">Travels</Text>
          </Button>
          <Button rounded="2xl">
            <Compass />
            <Text hideBelow="md">Explore</Text>
          </Button>
        </ButtonGroup>
        <Box pos="relative">
          <IconButton variant="plain" rounded="full" size="lg">
            <Avatar.Root size="md" shape="full" css={ringCss} colorPalette="cyan">
              <Avatar.Fallback />
            </Avatar.Root>
          </IconButton>
          <Float placement="bottom-start">
            <Circle bg="cyan.500" size="18px" outline="0.2em solid" outlineColor="bg">
              <AirplaneTakeoff size={12} />
            </Circle>
          </Float>
        </Box>
      </Flex>
    </header>
  );
}
