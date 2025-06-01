import { Flex, ButtonGroup, Button, Text } from "@chakra-ui/react";
import { Link } from "react-router";

export default function SiteNavbar() {
  return (
    <header>
      <Flex as="nav" justify="space-between" p="4">
        <Text fontWeight="900" fontSize="1.7rem">
          🌎 Worldly
        </Text>

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
