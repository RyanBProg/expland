import { Flex, ButtonGroup, Button, Text } from "@chakra-ui/react";
import { Link } from "react-router";

export default function SiteNavbar() {
  return (
    <header>
      <Flex as="nav" justify="space-between" alignItems="center" p="4">
        <Link
          to="/"
          css={{
            transition: "opacity 300ms ease-in-out",
            ":hover": {
              opacity: "0.7",
            },
          }}
        >
          <Text fontWeight="900" fontSize={{ base: "1.4rem", sm: "1.7rem" }}>
            🌎 Worldly
          </Text>
        </Link>

        <ButtonGroup as="ul">
          <Button asChild rounded="2xl" colorPalette="cyan">
            <Link to="/login">Log In</Link>
          </Button>
          <Button asChild rounded="2xl" colorPalette="gray">
            <Link to="/register">Sign Up</Link>
          </Button>
        </ButtonGroup>
      </Flex>
    </header>
  );
}
