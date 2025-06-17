import {
  Box,
  Button,
  Card,
  Flex,
  Grid,
  Heading,
  Input,
  Stack,
  Text,
  Badge,
} from "@chakra-ui/react";
import { Link } from "react-router";
import { PencilSimple, User } from "phosphor-react";

export default function ManageAccountPage() {
  return (
    <Flex direction="column" maxW="3xl" mx="auto" p="8">
      <Stack gap="6">
        {/* Header */}
        <Flex alignItems="center" gap="4">
          <Box p="4" rounded="full" bg="gray.800">
            <User size={44} />
          </Box>
          <Box>
            <Heading size="lg">Account Settings</Heading>
            <Text color="gray.500">Manage your account details and preferences</Text>
          </Box>
        </Flex>

        {/* Account Details Card */}
        <Card.Root rounded="2xl" p="6">
          <Stack gap="6">
            {/* Username */}
            <Box>
              <Text mb="2" color="gray.500">
                Username
              </Text>
              <Text fontSize="lg" fontWeight="medium">
                @username
              </Text>
            </Box>

            {/* Email */}
            <Box>
              <Text mb="2" color="gray.500">
                Email
              </Text>
              <Flex gap="3" alignItems="center">
                <Text fontSize="lg">user@example.com</Text>
                {/* Email verification badge */}
                <Badge colorScheme="yellow" variant="subtle">
                  Unverified
                </Badge>
              </Flex>
            </Box>

            {/* Name Fields */}
            <Grid templateColumns="repeat(2, 1fr)" gap="6">
              {/* Given Name */}
              <Box>
                <Text mb="2" color="gray.500">
                  First Name
                </Text>
                <Flex gap="3" alignItems="center">
                  <Text fontSize="lg">John</Text>
                  <Button size="sm" variant="ghost" rounded="full" aria-label="Edit first name">
                    <PencilSimple />
                  </Button>
                </Flex>
              </Box>

              {/* Family Name */}
              <Box>
                <Text mb="2" color="gray.500">
                  Last Name
                </Text>
                <Flex gap="3" alignItems="center">
                  <Text fontSize="lg">Doe</Text>
                  <Button size="sm" variant="ghost" rounded="full" aria-label="Edit last name">
                    <PencilSimple />
                  </Button>
                </Flex>
              </Box>
            </Grid>

            {/* Actions */}
            <Stack gap="4" pt="4">
              <Button variant="surface" size="lg" rounded="xl">
                Change Password
              </Button>

              <Button asChild variant="outline" size="lg" rounded="xl">
                <Link to="/dashboard/account/profile">View Profile</Link>
              </Button>

              <Button colorScheme="red" variant="ghost" size="lg" rounded="xl">
                Delete Account
              </Button>
            </Stack>
          </Stack>
        </Card.Root>

        {/* Password Change Section (Initially Hidden) */}
        <Card.Root rounded="2xl" p="6" display="none">
          <Stack gap="4">
            <Heading size="md">Change Password</Heading>
            <Input type="password" placeholder="Current password" size="lg" rounded="xl" />
            <Input type="password" placeholder="New password" size="lg" rounded="xl" />
            <Input type="password" placeholder="Confirm new password" size="lg" rounded="xl" />
            <Button colorScheme="cyan" size="lg" rounded="xl">
              Update Password
            </Button>
          </Stack>
        </Card.Root>
      </Stack>
    </Flex>
  );
}
