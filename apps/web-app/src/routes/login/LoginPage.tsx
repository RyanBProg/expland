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
  Field,
  Fieldset,
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router";

interface LoginResponse {
  message: string;
}

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      const data: LoginResponse = await response.json();

      if (!response.ok) {
        setError(data.message);
        return;
      }

      navigate("/dashboard");
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Flex
      className="group"
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
        alt="login page background"
        objectFit="cover"
        width="full"
        height="full"
        position="absolute"
        transition="transform 800ms ease-in-out"
        _groupHover={{
          transform: "scale(1.03)",
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
      <Card.Root size="lg" rounded="2xl" maxW="md" w="full" mx="4" my="10">
        <Card.Header pb="0">
          <Heading size="lg" textAlign="center">
            Welcome to <Span fontWeight="900">Worldly</Span>
          </Heading>
        </Card.Header>

        <Card.Body as="form" onSubmit={handleSubmit} pt="8">
          <Fieldset.Root size="lg" disabled={isLoading} invalid={error !== null}>
            <Stack>
              <Fieldset.Legend>Login details</Fieldset.Legend>
              <Fieldset.HelperText>Please provide your login details below.</Fieldset.HelperText>
            </Stack>

            <Fieldset.Content>
              <Field.Root invalid={error !== null}>
                <Field.Label>Email</Field.Label>
                <Input
                  placeholder="me@example.com"
                  size="lg"
                  rounded="xl"
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </Field.Root>

              <Field.Root invalid={error !== null}>
                <Field.Label>Password</Field.Label>
                <Input
                  placeholder="password123"
                  size="lg"
                  rounded="xl"
                  type="password"
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
              </Field.Root>
            </Fieldset.Content>
            <Fieldset.ErrorText>{error}</Fieldset.ErrorText>
          </Fieldset.Root>

          <Button
            type="submit"
            size="lg"
            colorPalette="cyan"
            rounded="xl"
            mt="6"
            loading={isLoading}
            loadingText="Logging In..."
          >
            Log In
          </Button>

          <Box textAlign="center" mt="6">
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
        </Card.Body>
      </Card.Root>
    </Flex>
  );
}
