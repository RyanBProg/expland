import { Flex, Stack, Text } from "@chakra-ui/react";
import { Link } from "react-router";

export default function SiteFooter() {
  const date = new Date();

  return (
    <Flex
      as="footer"
      p={4}
      gap={5}
      direction={{ base: "column-reverse", md: "row" }}
      justifyContent={{ md: "space-between" }}
      align={{ base: "center", md: "end" }}
    >
      <Text>© {date.getFullYear()} Worldly. All rights reserved</Text>
      <Stack direction={"row"} gap={6}>
        <Link to="#">Home</Link>
        <Link to="#">Contact</Link>
        <Link to="#">Policies</Link>
      </Stack>
    </Flex>
  );
}
