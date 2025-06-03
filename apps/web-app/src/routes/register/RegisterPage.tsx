import {
  Box,
  Button,
  Card,
  Flex,
  Grid,
  Heading,
  Input,
  Text,
  Stack,
  Image,
  Fieldset,
  Field,
  List,
} from "@chakra-ui/react";
import { Link } from "react-router";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { registerSchema, usernameSchema } from "@/utils/zod/authSchema";

interface LoginResponse {
  message: string;
}

type FieldErrors = {
  [K in keyof typeof emptyForm]?: string;
};

const emptyForm = {
  givenName: "",
  familyName: "",
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export default function RegisterPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState(emptyForm);
  const [isLoading, setIsLoading] = useState(false);
  const [zodErrors, setZodErrors] = useState<FieldErrors>({});
  const [resError, setResError] = useState<string | null>(null);
  const [usernameAvailable, setUsernameAvailable] = useState(false);
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);

  useEffect(() => {
    if (form.username.length < 3) {
      setUsernameAvailable(false);
      return;
    }

    const timeout = setTimeout(() => {
      checkUsername(form.username);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [form.username]);

  const checkUsername = async (username: string) => {
    setIsCheckingUsername(true);
    const parsedResult = usernameSchema.safeParse(username);
    if (!parsedResult.success) {
      setZodErrors({ username: parsedResult.error.errors[0].message });
      setUsernameAvailable(false);
      setIsCheckingUsername(false);
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/check-username?username=${username}`,
        { method: "GET" },
      );
      const data = await response.json();

      if (response.ok) {
        setUsernameAvailable(data.available);
        setZodErrors(prev => ({
          ...prev,
          username: data.available ? undefined : "Username is taken",
        }));
      }
    } catch (err) {
      setZodErrors(prev => ({ ...prev, username: "Error checking username" }));
    } finally {
      setIsCheckingUsername(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!usernameAvailable) {
      return;
    }

    setIsLoading(true);
    setZodErrors({});
    setResError(null);

    try {
      const parsedResult = registerSchema.safeParse(form);
      if (!parsedResult.success) {
        const fieldErrors: FieldErrors = {};
        parsedResult.error.errors.forEach(error => {
          const field = error.path[0] as keyof typeof emptyForm;
          fieldErrors[field] = error.message;
        });
        setZodErrors(fieldErrors);
        return;
      }

      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(form),
      });

      const data: LoginResponse = await response.json();

      if (!response.ok) {
        setResError(data.message);
        return;
      }

      navigate("/dashboard");
    } catch (err) {
      setResError("An error occurred. Please try again");
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
        alt="resgister page background"
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
      <Card.Root size="lg" rounded="2xl" maxW="md" w="full" mx="4">
        <Card.Header pb="0">
          <Heading size="lg" textAlign="center">
            Create an Account
          </Heading>
        </Card.Header>

        <Card.Body as="form" onSubmit={handleSubmit} pt="8">
          <Fieldset.Root size="lg" disabled={isLoading}>
            <Stack>
              <Fieldset.Legend>Account details</Fieldset.Legend>
              <Fieldset.HelperText>Please provide your details below.</Fieldset.HelperText>
            </Stack>

            <Fieldset.Content>
              <Grid templateColumns="repeat(2, 1fr)" gap="4">
                <Field.Root invalid={!!zodErrors.givenName}>
                  <Field.Label>Given Name</Field.Label>
                  <Input
                    placeholder="Enter given name"
                    size="lg"
                    rounded="xl"
                    type="text"
                    required
                    value={form.givenName}
                    onChange={e => setForm(prev => ({ ...prev, givenName: e.target.value }))}
                  />
                  {zodErrors.givenName && <Field.ErrorText>{zodErrors.givenName}</Field.ErrorText>}
                </Field.Root>

                <Field.Root invalid={!!zodErrors.familyName}>
                  <Field.Label>Family Name</Field.Label>
                  <Input
                    placeholder="Enter family name"
                    size="lg"
                    rounded="xl"
                    type="text"
                    required
                    value={form.familyName}
                    onChange={e => setForm(prev => ({ ...prev, familyName: e.target.value }))}
                  />
                  {zodErrors.familyName && (
                    <Field.ErrorText>{zodErrors.familyName}</Field.ErrorText>
                  )}
                </Field.Root>
              </Grid>

              <Field.Root invalid={!!zodErrors.email}>
                <Field.Label>Email</Field.Label>
                <Input
                  placeholder="Enter your email"
                  size="lg"
                  rounded="xl"
                  type="email"
                  required
                  value={form.email}
                  onChange={e => setForm(prev => ({ ...prev, email: e.target.value }))}
                />
                {zodErrors.email && <Field.ErrorText>{zodErrors.email}</Field.ErrorText>}
              </Field.Root>

              <Field.Root invalid={!!zodErrors.username}>
                <Field.Label>Username</Field.Label>
                <Input
                  placeholder="Choose a username"
                  size="lg"
                  rounded="xl"
                  type="text"
                  required
                  value={form.username}
                  onChange={e => {
                    setForm(prev => ({ ...prev, username: e.target.value }));
                  }}
                />
                {isCheckingUsername && (
                  <Text fontSize="xs" color="gray.500">
                    Checking availability...
                  </Text>
                )}
                {!isCheckingUsername &&
                  form.username.length >= 3 &&
                  form.username &&
                  usernameAvailable && (
                    <Text fontSize="xs" color="green.500">
                      Username is available
                    </Text>
                  )}
                {zodErrors.username && <Field.ErrorText>{zodErrors.username}</Field.ErrorText>}
                <Stack fontSize="xs" color="fg.muted" mt="1" gap="1">
                  <Text>Username requirements:</Text>
                  <List.Root ml="3">
                    <List.Item>Letters (a-z)</List.Item>
                    <List.Item>Numbers (0-9)</List.Item>
                    <List.Item>Hyphens (-) and underscores (_)</List.Item>
                    <List.Item>Between 3-20 characters</List.Item>
                  </List.Root>
                </Stack>
              </Field.Root>

              <Field.Root invalid={!!zodErrors.password}>
                <Field.Label>Password</Field.Label>
                <Input
                  placeholder="Create a password"
                  size="lg"
                  rounded="xl"
                  type="password"
                  required
                  value={form.password}
                  onChange={e => setForm(prev => ({ ...prev, password: e.target.value }))}
                />
                <Stack fontSize="xs" color="fg.muted" mt="1" gap="1">
                  <Text>Password must contain at least:</Text>
                  <List.Root ml="3">
                    <List.Item>1 Uppercase letter</List.Item>
                    <List.Item>1 Lowercase letter</List.Item>
                    <List.Item>1 Number</List.Item>
                  </List.Root>
                </Stack>
                {zodErrors.password && <Field.ErrorText>{zodErrors.password}</Field.ErrorText>}
              </Field.Root>

              <Field.Root invalid={!!zodErrors.confirmPassword}>
                <Field.Label>Confirm Password</Field.Label>
                <Input
                  placeholder="Repeat your password"
                  size="lg"
                  rounded="xl"
                  type="password"
                  required
                  value={form.confirmPassword}
                  onChange={e => setForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                />
                {zodErrors.confirmPassword && (
                  <Field.ErrorText>{zodErrors.confirmPassword}</Field.ErrorText>
                )}
              </Field.Root>
            </Fieldset.Content>
            {resError && <Fieldset.ErrorText>{resError}</Fieldset.ErrorText>}
          </Fieldset.Root>

          <Button
            type="submit"
            size="lg"
            colorPalette="cyan"
            rounded="xl"
            mt="6"
            loading={isLoading}
            loadingText="Signing Up..."
          >
            Create Account
          </Button>

          <Box textAlign="center" mt="6">
            <Text color="gray.500">
              Have an account?{" "}
              <Link
                to="/login"
                css={{
                  color: "cyan",
                  marginLeft: "2px",
                }}
              >
                Log In
              </Link>
            </Text>
          </Box>
        </Card.Body>
      </Card.Root>
    </Flex>
  );
}
