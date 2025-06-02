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
      <Flex
        as="nav"
        aria-label="footer navigation"
        gap={{ base: "3", sm: "6" }}
        alignItems="center"
      >
        <Link
          to="/"
          aria-label="Worldly Home"
          css={{
            transition: "opacity 300ms ease-in-out",
            ":hover": {
              opacity: "0.7",
            },
          }}
        >
          <Text fontWeight="500">
            <span aria-hidden="true">🌎</span> Worldly
          </Text>
        </Link>
        <Separator orientation="vertical" height="4" color="bg" aria-hidden="true" />
        <Link
          to="/contact"
          aria-label="Contact us"
          css={{
            transition: "opacity 300ms ease-in-out",
            ":hover": {
              opacity: "0.7",
            },
          }}
        >
          <Text fontWeight="500">
            <span aria-hidden="true">📬</span> Contact
          </Text>
        </Link>
        <Separator orientation="vertical" height="4" color="bg" aria-hidden="true" />
        <Link
          to="/policies"
          aria-label="Our policies"
          css={{
            transition: "opacity 300ms ease-in-out",
            ":hover": {
              opacity: "0.7",
            },
          }}
        >
          <Text fontWeight="500">
            <span aria-hidden="true">👮</span> Policies
          </Text>
        </Link>
      </Flex>
    </Flex>
  );
}
