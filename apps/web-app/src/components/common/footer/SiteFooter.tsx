import { Flex, Separator, Text } from "@chakra-ui/react";
import { Link } from "react-router";

export default function SiteFooter() {
  const date = new Date();

  return (
    <Flex
      as="footer"
      p={4}
      gap="6"
      py="8"
      direction={{ base: "column-reverse", md: "row" }}
      justifyContent={{ md: "space-between" }}
      align={{ base: "center", md: "end" }}
    >
      <Text>© {date.getFullYear()} Worldly. All rights reserved</Text>
      <Flex gap={{ base: "3", sm: "6" }} alignItems="center">
        <Link
          to="/"
          css={{
            transition: "opacity 300ms ease-in-out",
            ":hover": {
              opacity: "0.7",
            },
          }}
        >
          <Text fontWeight="500">🌎 Worldly</Text>
        </Link>
        <Separator orientation="vertical" height="4" color="bg" />
        <Link
          to="/contact"
          css={{
            transition: "opacity 300ms ease-in-out",
            ":hover": {
              opacity: "0.7",
            },
          }}
        >
          <Text fontWeight="500">📬 Contact</Text>
        </Link>
        <Separator orientation="vertical" height="4" color="bg" />
        <Link
          to="/policies"
          css={{
            transition: "opacity 300ms ease-in-out",
            ":hover": {
              opacity: "0.7",
            },
          }}
        >
          <Text fontWeight="500">👮 Policies</Text>
        </Link>
      </Flex>
    </Flex>
  );
}
