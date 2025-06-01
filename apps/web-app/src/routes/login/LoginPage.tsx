import {
  Box,
  Button,
  Card,
  Flex,
  Heading,
  Input,
  Text,
  Stack,
  Image,
  Span,
} from "@chakra-ui/react";
import { Link } from "react-router";

export default function LoginPage() {
  return (
    <Flex
      minHeight="100vh"
      width="full"
      align="center"
      justifyContent="center"
      position="relative"
      overflow="hidden"
    >
      {/* Background Image */}
      <Image
        src="/images/login-background.jpg"
        objectFit="cover"
        width="full"
        height="full"
        position="absolute"
        transition="transform 800ms ease-in-out"
        _groupHover={{
          transform: "scale(1.04)",
        }}
      />

      {/* Background Mask */}
      <Box
        position="absolute"
        inset="0"
        bg="blackAlpha.600"
        transition="background 800ms ease-in-out"
        _groupHover={{
          bg: "blackAlpha.700",
        }}
      />
      <Card.Root size="lg" rounded="2xl" maxW="md" w="full" mx="4">
        <Card.Header pb="0">
          <Heading size="lg" textAlign="center">
            Welcome to <Span fontWeight="900">Worldly</Span>
          </Heading>
        </Card.Header>

        <Card.Body as="form" pt="8">
          <Stack gap="6">
            <Box>
              <Text mb="2">Email</Text>
              <Input type="email" placeholder="Enter your email" size="lg" rounded="xl" />
            </Box>

            <Box>
              <Text mb="2">Password</Text>
              <Input type="password" placeholder="Enter your password" size="lg" rounded="xl" />
            </Box>

            <Button size="lg" colorScheme="cyan" rounded="xl">
              Log In
            </Button>

            <Box textAlign="center">
              <Text color="gray.500">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  css={{
                    color: "cyan",
                    marginLeft: "2px",
                  }}
                >
                  Sign Up
                </Link>
              </Text>
            </Box>
          </Stack>
        </Card.Body>
      </Card.Root>
    </Flex>
  );
}
