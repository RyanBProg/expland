import { Flex, Button, Text } from "@chakra-ui/react";
import { Link } from "react-router";

export default function SiteNavbar() {
  return (
    <header>
      <nav>
        <Flex as="ul" aria-label="main navigation" alignItems="center" p="4">
          <li css={{ flexGrow: "1" }}>
            <Link
              to="/"
              aria-label="worldly home"
              css={{
                display: "inline-block",
                width: "fit-content",
                transition: "opacity 300ms ease-in-out",
                ":hover": {
                  opacity: "0.7",
                },
              }}
            >
              <Text fontWeight="900" fontSize={{ base: "1.4rem", sm: "1.7rem" }}>
                <span aria-hidden="true">🌎</span> Expland
              </Text>
            </Link>
          </li>
          <li css={{ marginRight: "10px" }}>
            <Button asChild rounded="2xl" colorPalette="cyan">
              <Link to="/login">Log In</Link>
            </Button>
          </li>
          <li>
            <Button asChild rounded="2xl" colorPalette="gray">
              <Link to="/register">Sign Up</Link>
            </Button>
          </li>
        </Flex>
      </nav>
    </header>
  );
}
