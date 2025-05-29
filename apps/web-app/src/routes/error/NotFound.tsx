import { useRouteError, Link } from "react-router";
import { Box, Heading, Text, Button } from "@chakra-ui/react";

export default function ErrorPage() {
  const error = useRouteError() as { statusText?: string; message?: string };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      gap={4}
      p={4}
    >
      <Heading size="2xl">Oops!</Heading>
      <Text fontSize="xl">Sorry, an unexpected error has occurred.</Text>
      <Text color="gray.500">{error.statusText || error.message || "Page not found"}</Text>
      <Button asChild colorScheme="blue">
        <Link to="/">Go back home</Link>
      </Button>
    </Box>
  );
}
