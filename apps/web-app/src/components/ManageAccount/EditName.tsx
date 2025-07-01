import { useUpdateFamilyName, useUpdateGivenName } from "@/hooks/useAccount";
import { nameSchema } from "@/utils/zod/authSchema";
import { Flex, IconButton, Input, Spinner, Text } from "@chakra-ui/react";
import { Check, PencilSimple, X } from "phosphor-react";
import { useState, type FormEvent } from "react";
import { toaster } from "../ui/toaster";
import type { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";

type Props = {
  title: "Given Name" | "Family Name";
  name: string;
  refetchAccount: (options?: RefetchOptions) => Promise<QueryObserverResult<any, Error>>;
};

export default function EditName({ title, name, refetchAccount }: Props) {
  const [isEdit, setIsEdit] = useState(false);
  const [newName, setNewName] = useState(name);
  const [zodError, setZodError] = useState<string | null>(null);
  const [mutationError, setMutationError] = useState<string | null>(null);

  const idLabel = title === "Given Name" ? "given-name" : "family-name";

  const cancelEdit = () => {
    setIsEdit(false);
    setNewName(name);
    setZodError(null);
    setMutationError(null);
  };

  // Mutation
  let mutation = null;
  if (title === "Given Name") {
    mutation = useUpdateGivenName(newName);
  } else {
    mutation = useUpdateFamilyName(newName);
  }
  const isMutationPending = mutation.isPending;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setZodError(null);
    setMutationError(null);

    if (name === newName) {
      return;
    }

    const parsedResult = nameSchema.safeParse(newName);
    if (!parsedResult.success) {
      setZodError(parsedResult.error.errors[0].message);
      return;
    }

    try {
      const { message, success } = await mutation.mutateAsync();
      if (!success) {
        throw new Error(message);
      }

      setIsEdit(false);

      await refetchAccount();

      toaster.create({
        title: `${title} Updated`,
        description: `${title} updated successfully`,
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
        {title}
      </Text>
      {isEdit ? (
        <form onSubmit={handleSubmit} css={{ display: "flex", gap: "10px" }}>
          <Flex direction="column" gap="4">
            <Flex gap="2">
              <label htmlFor={`${idLabel}-input`} style={{ display: "none" }}>
                {title}
              </label>
              <Input
                id={`${idLabel}-input`}
                value={newName}
                disabled={isMutationPending}
                rounded="lg"
                onChange={e => setNewName(e.target.value)}
                size={{ base: "sm", md: "lg" }}
                aria-label={`New ${title}`}
                aria-describedby={zodError || mutationError ? `${idLabel}-error` : undefined}
              />
              <IconButton
                type="submit"
                disabled={isMutationPending || name === newName}
                variant="surface"
                size={{ base: "sm", md: "lg" }}
                rounded="lg"
                aria-label={`Save ${title}`}
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
                aria-label={`Cancel editing ${title}`}
              >
                {isMutationPending ? <Spinner size="sm" /> : <X />}
              </IconButton>
            </Flex>
            {(zodError || mutationError) && (
              <Text id={`${idLabel}-error`} fontSize="xs" color="red.500">
                {zodError || mutationError}
              </Text>
            )}
          </Flex>
        </form>
      ) : (
        <Flex gap="4" alignItems="center">
          <Text fontSize={{ base: "md", md: "lg" }} textTransform="capitalize">
            {name}
          </Text>
          <IconButton variant="surface" size="sm" rounded="xl" onClick={() => setIsEdit(true)}>
            <PencilSimple />
          </IconButton>
        </Flex>
      )}
    </div>
  );
}
