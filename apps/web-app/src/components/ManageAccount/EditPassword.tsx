import { useUpdatePassword } from "@/hooks/useAccount";
import { strongPasswordSchema } from "@/utils/zod/authSchema";
import { Button, Flex, IconButton, Input, Span, Spinner, Text } from "@chakra-ui/react";
import { Check, X } from "phosphor-react";
import { useState, type FormEvent } from "react";
import { toaster } from "../ui/toaster";
import type { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";

type Props = {
  refetchAccount: (options?: RefetchOptions) => Promise<QueryObserverResult<any, Error>>;
};

export default function EditPassword({ refetchAccount }: Props) {
  const [isEdit, setIsEdit] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [zodError, setZodError] = useState<string | null>(null);
  const [mutationError, setMutationError] = useState<string | null>(null);

  const cancelEdit = () => {
    setIsEdit(false);
    setCurrentPassword("");
    setNewPassword("");
    setZodError(null);
    setMutationError(null);
  };

  // Mutation
  const createPasswordMutation = useUpdatePassword();
  const isMutationPending = createPasswordMutation.isPending;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setZodError(null);
    setMutationError(null);

    const parsedResult = strongPasswordSchema.safeParse(newPassword);
    if (!parsedResult.success) {
      setZodError(parsedResult.error.errors[0].message);
      return;
    }

    try {
      const { message, success } = await createPasswordMutation.mutateAsync({
        currentPassword,
        newPassword,
      });
      if (!success) {
        throw new Error(message);
      }

      setIsEdit(false);

      await refetchAccount();

      toaster.create({
        title: `Password Updated`,
        description: `Password updated successfully`,
        type: "success",
      });

      setMutationError(null);
    } catch (error: any) {
      setMutationError(error.message);
    }
  };

  return (
    <>
      {isEdit ? (
        <form onSubmit={handleSubmit} css={{ display: "flex", gap: "10px" }}>
          <Flex direction="column" gap="4" width="full">
            {/* Current password */}
            <Flex gap="2" direction="column">
              <label htmlFor={`current-password-input`}>
                <Span color="gray.500">Current Password</Span>
              </label>
              <Input
                type="password"
                id={`current-password-input`}
                value={currentPassword}
                disabled={isMutationPending}
                rounded="lg"
                onChange={e => setCurrentPassword(e.target.value)}
                size={{ base: "sm", md: "lg" }}
                aria-label={`Current password`}
                aria-describedby={zodError || mutationError ? `password-error` : undefined}
              />
            </Flex>

            {/* New password */}
            <Flex gap="2" direction="column" width="full">
              <label htmlFor={`new-password-input`}>
                <Span color="gray.500">New Password</Span>
              </label>
              <Input
                type="password"
                id={`new-password-input`}
                value={newPassword}
                disabled={isMutationPending}
                rounded="lg"
                onChange={e => setNewPassword(e.target.value)}
                size={{ base: "sm", md: "lg" }}
                aria-label={`New password`}
                aria-describedby={zodError || mutationError ? `password-error` : undefined}
              />
            </Flex>

            <Flex gap="2">
              <IconButton
                type="submit"
                disabled={isMutationPending}
                variant="surface"
                size={{ base: "sm", md: "lg" }}
                rounded="lg"
                aria-label={`Save password`}
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
                aria-label={`Cancel editing password`}
              >
                {isMutationPending ? <Spinner size="sm" /> : <X />}
              </IconButton>
            </Flex>
            {(zodError || mutationError) && (
              <Text id={`password-error`} fontSize="xs" color="red.500">
                {zodError || mutationError}
              </Text>
            )}
          </Flex>
        </form>
      ) : (
        <Button onClick={() => setIsEdit(true)} variant="surface" size="lg" rounded="xl">
          Change Password
        </Button>
      )}
    </>
  );
}
