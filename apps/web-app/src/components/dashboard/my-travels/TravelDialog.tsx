import { Button, CloseButton, Dialog, Portal } from "@chakra-ui/react";
import { Pencil, PlusCircle } from "phosphor-react";
import { useState } from "react";
import { Tooltip } from "../../ui/tooltip";
import TravelForm from "./TravelForm";

type TravelDialogProps = {
  onSuccess: () => Promise<void>;
  mode: "edit" | "create";
  travelId?: number;
};

export default function TravelDialog({ onSuccess, mode, travelId }: TravelDialogProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog.Root
      lazyMount
      size="full"
      placement="center"
      motionPreset="slide-in-bottom"
      open={open}
      onOpenChange={e => setOpen(e.open)}
    >
      <Dialog.Trigger asChild>
        {mode === "create" ? (
          <Button rounded="2xl" size="md" variant="surface" position="relative">
            <Tooltip openDelay={300} content="Add a Travel">
              <div
                css={{
                  position: "absolute",
                  inset: "0",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <PlusCircle />
              </div>
            </Tooltip>
          </Button>
        ) : (
          <Button size="sm" variant="surface">
            Edit Travel
            <Pencil />
          </Button>
        )}
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title textTransform="capitalize">{mode} a Travel</Dialog.Title>
              <Dialog.CloseTrigger asChild>
                <CloseButton size="sm" />
              </Dialog.CloseTrigger>
            </Dialog.Header>
            <Dialog.Body>
              <TravelForm
                onSuccess={onSuccess}
                open={open}
                setOpen={setOpen}
                mode={mode}
                travelId={travelId}
              />
            </Dialog.Body>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
