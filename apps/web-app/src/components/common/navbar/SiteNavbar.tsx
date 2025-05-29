import { Flex, ButtonGroup, Button } from "@chakra-ui/react";
import { House, Star } from "phosphor-react";
import { Link } from "react-router";

export default function SiteNavbar() {
  return (
    <header>
      <Flex as="nav" justify="space-between" p="4">
        <ButtonGroup as="ul" variant="subtle">
          <Button asChild rounded="2xl">
            <Link to="/">
              <House />
              Home
            </Link>
          </Button>
          <Button asChild rounded="2xl">
            <Link to="/features">
              <Star />
              Features
            </Link>
          </Button>
        </ButtonGroup>

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
