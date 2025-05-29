import { Box, Button, Card, Flex, Grid, Heading, Input, Text, Stack } from "@chakra-ui/react";
import { Link } from "react-router";

export default function RegisterPage() {
  return (
    <Flex minHeight="100vh" width="full" align="center" justifyContent="center" bg="gray.900">
      <Card.Root size="lg" rounded="2xl" maxW="md" w="full" mx="4">
        <Card.Header pb="0">
          <Heading size="lg" textAlign="center">
            Create an Account
          </Heading>
        </Card.Header>

        <Card.Body as="form" pt="8">
          <Stack gap="6">
            <Grid templateColumns="repeat(2, 1fr)" gap="4">
              <Box>
                <Text mb="2">First Name</Text>
                <Input type="text" placeholder="Enter first name" size="lg" rounded="xl" />
              </Box>

              <Box>
                <Text mb="2">Last Name</Text>
                <Input type="text" placeholder="Enter last name" size="lg" rounded="xl" />
              </Box>
            </Grid>

            <Box>
              <Text mb="2">Username</Text>
              <Input type="text" placeholder="Choose a username" size="lg" rounded="xl" />
            </Box>

            <Box>
              <Text mb="2">Email</Text>
              <Input type="email" placeholder="Enter your email" size="lg" rounded="xl" />
            </Box>

            <Box>
              <Text mb="2">Password</Text>
              <Input type="password" placeholder="Create a password" size="lg" rounded="xl" />
            </Box>

            <Button size="lg" colorScheme="cyan" rounded="xl">
              Create Account
            </Button>

            <Box textAlign="center">
              <Text color="gray.500">
                Already have an account?{" "}
                <Link
                  to="/login"
                  css={{
                    color: "cyan",
                  }}
                >
                  Log In
                </Link>
              </Text>
            </Box>
          </Stack>
        </Card.Body>
      </Card.Root>
    </Flex>
  );
}
