import { useUpdateUsername } from "@/hooks/useAccount";
import { usernameSchema } from "@/utils/zod/authSchema";
import { Flex, IconButton, Input, List, Spinner, Stack, Text } from "@chakra-ui/react";
import { Check, PencilSimple, X } from "phosphor-react";
import { useState, type FormEvent } from "react";
import { toaster } from "../ui/toaster";
import type { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";

type Props = {
  username: string;
  refetchAccount: (options?: RefetchOptions) => Promise<QueryObserverResult<any, Error>>;
};

export default function EditUsername({ username, refetchAccount }: Props) {
  const [isEdit, setIsEdit] = useState(false);
  const [newUsername, setNewUsername] = useState(username);
  const [zodError, setZodError] = useState<string | null>(null);
  const [mutationError, setMutationError] = useState<string | null>(null);

  const cancelEdit = () => {
    setIsEdit(false);
    setNewUsername(username);
    setZodError(null);
    setMutationError(null);
  };

  // Mutation
  const createUsernameMutation = useUpdateUsername(newUsername);
  const isMutationPending = createUsernameMutation.isPending;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setZodError(null);
    setMutationError(null);

    if (username === newUsername) {
      return;
    }

    const parsedResult = usernameSchema.safeParse(newUsername);
    if (!parsedResult.success) {
      setZodError(parsedResult.error.errors[0].message);
      return;
    }

    try {
      const { message, success } = await createUsernameMutation.mutateAsync();

      if (!success) {
        throw new Error(message);
      }

      setIsEdit(false);

      await refetchAccount();

      toaster.create({
        title: "Username Updated",
        description: "Username updated successfully",
        type: "success",
      });

      setMutationError(null);
    } catch (error: any) {
      setMutationError(error.message);
    }
  };

  return (
    <div>
      <Text mb="2" color="gray.500">
        Username
      </Text>
      {isEdit ? (
        <form onSubmit={handleSubmit} css={{ display: "flex", gap: "10px" }}>
          <Flex direction="column" gap="4">
            <Flex gap="2">
              <label htmlFor="username-input" style={{ display: "none" }}>
                New username
              </label>
              <Input
                id="username-input"
                value={newUsername}
                disabled={isMutationPending}
                rounded="lg"
                onChange={e => setNewUsername(e.target.value)}
                size={{ base: "sm", md: "lg" }}
                aria-label="New username"
                aria-describedby={zodError || mutationError ? "username-error" : undefined}
              />
              <IconButton
                type="submit"
                disabled={isMutationPending || newUsername === username}
                variant="surface"
                size={{ base: "sm", md: "lg" }}
                rounded="lg"
                aria-label="Save username"
              >
                {isMutationPending ? <Spinner size="sm" /> : <Check />}
              </IconButton>
              <IconButton
                type="button"
                disabled={isMutationPending}
                variant="surface"
                size={{ base: "sm", md: "lg" }}
                rounded="lg"
                onClick={cancelEdit}
                aria-label="Cancel editing username"
              >
                {isMutationPending ? <Spinner size="sm" /> : <X />}
              </IconButton>
            </Flex>
            {(zodError || mutationError) && (
              <Text id="username-error" fontSize="xs" color="red.500">
                {zodError || mutationError}
              </Text>
            )}
            <Stack fontSize="xs" color="fg.muted" mt="1" gap="1">
              <Text>Username requirements:</Text>
              <List.Root ml="3">
                <List.Item>Letters (a-z)</List.Item>
                <List.Item>Numbers (0-9)</List.Item>
                <List.Item>Hyphens (-) and underscores (_)</List.Item>
                <List.Item>Between 3-20 characters</List.Item>
              </List.Root>
            </Stack>
          </Flex>
        </form>
      ) : (
        <Flex gap="4" alignItems="center">
          <Text fontSize={{ base: "md", md: "lg" }}>@{username}</Text>
          <IconButton variant="surface" size="sm" rounded="xl" onClick={() => setIsEdit(true)}>
            <PencilSimple />
          </IconButton>
        </Flex>
      )}
    </div>
  );
}
