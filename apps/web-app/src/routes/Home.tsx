import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Flex,
  Heading,
  Image,
  List,
  Span,
} from "@chakra-ui/react";
import { Link } from "react-router";

export default function Home() {
  return (
    <main>
      <HomeBanner />
    </main>
  );
}

const HomeBanner = () => {
  return (
    <Flex
      as="section"
      className="group"
      overflow="hidden"
      minHeight="700px"
      maxHeight="900px"
      position="relative"
      justifyItems="center"
    >
      {/* Background Image */}
      <Image
        src="/images/home-banner.jpg"
        objectFit="cover"
        display="block"
        width="full"
        transition="transform 800ms ease-in-out"
        _groupHover={{
          transform: "scale(1.04)",
        }}
      />

      {/* Background Mask */}
      <Box
        position="absolute"
        inset="0"
        bg="blackAlpha.600"
        transition="background 800ms ease-in-out"
        _groupHover={{
          bg: "blackAlpha.700",
        }}
      />

      {/* Text */}
      <Box
        position="absolute"
        inset="0"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        px={{ base: "10px", sm: "40px" }}
      >
        <Heading
          as="h1"
          fontWeight="500"
          lineHeight={{ base: "2rem", sm: "2.4rem", md: "3.2rem" }}
          fontSize={{ base: "1.5rem", sm: "2rem", md: "3rem" }}
        >
          <Span
            color="cyan.400"
            fontWeight="900"
            fontSize={{ base: "3.5rem", sm: "4rem", md: "5rem" }}
          >
            Track
          </Span>{" "}
          your travels.
          <br />
          <Span
            color="cyan.500"
            fontWeight="900"
            fontSize={{ base: "3.5rem", sm: "4rem", md: "5rem" }}
          >
            Plan
          </Span>{" "}
          your escape.
          <br />
          <Span
            color="cyan.600"
            fontWeight="900"
            fontSize={{ base: "3.5rem", sm: "4rem", md: "5rem" }}
          >
            Share
          </Span>{" "}
          your journey.
        </Heading>

        <List.Root
          mt={{ base: "20px", md: "40px" }}
          gap="2"
          variant="plain"
          align="center"
          fontWeight="500"
          fontSize={{ base: "0.9rem", sm: "1rem", md: "1.2rem" }}
        >
          <List.Item>
            <List.Indicator color="green.500">🌍</List.Indicator>
            Track 195 countries, 10,000+ cities
          </List.Item>
          <List.Item>
            <List.Indicator color="green.500">📊</List.Indicator>
            Visualize your travel story with maps, stats, and timelines
          </List.Item>
          <List.Item>
            <List.Indicator color="green.500">👥</List.Indicator>
            Connect with explorers, share guides & trip highlights
          </List.Item>
        </List.Root>

        <AvatarGroup mt="5" gap="0" spaceX="-3" size="lg">
          <Avatar.Root>
            <Avatar.Fallback name="Uchiha Sasuke" />
            <Avatar.Image src="https://cdn.myanimelist.net/r/84x124/images/characters/9/131317.webp?s=d4b03c7291407bde303bc0758047f6bd" />
          </Avatar.Root>

          <Avatar.Root>
            <Avatar.Fallback name="Baki Ani" />
            <Avatar.Image src="https://cdn.myanimelist.net/r/84x124/images/characters/7/284129.webp?s=a8998bf668767de58b33740886ca571c" />
          </Avatar.Root>

          <Avatar.Root>
            <Avatar.Fallback name="Uchiha Chan" />
            <Avatar.Image src="https://cdn.myanimelist.net/r/84x124/images/characters/9/105421.webp?s=269ff1b2bb9abe3ac1bc443d3a76e863" />
          </Avatar.Root>
          <Avatar.Root variant="solid">
            <Avatar.Fallback>+</Avatar.Fallback>
          </Avatar.Root>
        </AvatarGroup>

        <Button asChild width="fit-content" mt="5" px="5">
          <Link to="/register">Join Other Travellers</Link>
        </Button>
      </Box>
    </Flex>
  );
};
