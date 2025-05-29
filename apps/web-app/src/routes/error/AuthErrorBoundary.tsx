import { Link } from "react-router";
import { Box, Heading, Text, Button } from "@chakra-ui/react";

export default function AuthErrorBoundary() {
  return (
    <Box display="flex" flexDirection="column" alignItems="center" gap={4} p={8}>
      <Heading size="lg">Session Expired</Heading>
      <Text>Please log in again to continue</Text>
      <Button asChild colorScheme="blue">
        <Link to="/login">Log In</Link>
      </Button>
    </Box>
  );
}
