import {
  Box,
  Button,
  Card,
  Flex,
  Grid,
  Heading,
  Stack,
  Text,
  Spinner,
  Separator,
  Avatar,
} from "@chakra-ui/react";
import { useAccount } from "@/hooks/useAccount";
import EditUsername from "@/components/ManageAccount/EditUsername";
import EditName from "@/components/ManageAccount/EditName";
import EditPassword from "@/components/ManageAccount/EditPassword";
import { useLogout, useLogoutAll } from "@/hooks/useAuth";
import { useNavigate } from "react-router";

export default function ManageAccountPage() {
  const { data: account, isLoading, error, refetch: refetchAccount } = useAccount();

  // Mutations
  const logoutMutation = useLogout();
  const logoutAllMutation = useLogoutAll();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutMutation.mutateAsync();
      navigate("/");
    } catch (e) {
      // Optionally show a toast or error
    }
  };

  const handleLogoutAll = async () => {
    try {
      await logoutAllMutation.mutateAsync();
      navigate("/");
    } catch (e) {
      // Optionally show a toast or error
    }
  };

  if (isLoading)
    return (
      <Flex justify="center" align="center" minH="40vh">
        <Spinner size="xl" />
      </Flex>
    );
  if (error)
    return (
      <Flex justify="center" align="center" minH="40vh">
        <Text color="red.500">Error loading account: {error.message}</Text>
      </Flex>
    );
  if (!account)
    return (
      <Flex justify="center" align="center" minH="40vh">
        <Text color="red.500">No account data found</Text>
      </Flex>
    );

  return (
    <Flex direction="column" maxW="3xl" mx="auto" p="4" pt="10">
      <Stack gap="6">
        {/* Header */}
        <Flex alignItems="center" gap="4">
          <Avatar.Root size="2xl">
            <Avatar.Fallback name={`${account.givenName} ${account.familyName}`} />
          </Avatar.Root>

          <Box>
            <Heading size="lg">Account Settings</Heading>
            <Text color="gray.500">Manage your account details and preferences</Text>
          </Box>
        </Flex>

        {/* Account Details Card */}
        <Card.Root rounded="2xl" p="6">
          <Stack gap="6">
            {/* Email */}
            <Box>
              <Text mb="2" color="gray.500">
                Email
              </Text>
              <Text fontSize={{ base: "md", md: "lg" }}>{account.email}</Text>
            </Box>

            {/* Username */}
            <EditUsername username={account.username} refetchAccount={refetchAccount} />

            <Separator />

            {/* Name Fields */}
            <EditName title="Given Name" name={account.givenName} refetchAccount={refetchAccount} />
            <EditName
              title="Family Name"
              name={account.familyName}
              refetchAccount={refetchAccount}
            />

            <Separator />

            <EditPassword refetchAccount={refetchAccount} />

            <Separator />

            <Flex direction="column" gap="5">
              <Grid templateColumns="repeat(2, 1fr)" gap="3">
                <Button
                  variant="surface"
                  size="lg"
                  rounded="xl"
                  disabled={logoutMutation.isPending}
                  onClick={handleLogout}
                >
                  {logoutMutation.isPending ? <Spinner size="md" /> : "Logout"}
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  rounded="xl"
                  disabled={logoutAllMutation.isPending}
                  onClick={handleLogoutAll}
                >
                  {logoutAllMutation.isPending ? <Spinner size="md" /> : "Logout All"}
                </Button>
              </Grid>
            </Flex>
          </Stack>
        </Card.Root>
      </Stack>
    </Flex>
  );
}
