import { HStack, Progress, Text } from "@chakra-ui/react";

type Props = {
  label: string;
  val: number;
  maxVal: number;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
};

export default function ProgressBar({ label, val, maxVal, size = "md" }: Props) {
  return (
    <Progress.Root value={val} min={0} max={maxVal} maxWidth="full" size={size}>
      <HStack mb="2" alignItems="baseline" justifyContent="space-between">
        <Progress.Label fontSize={size}>{label}</Progress.Label>
        <Text fontSize={size === "xs" || size === "sm" ? "xs" : "sm"}>
          {val} of {maxVal}
        </Text>
      </HStack>

      <Progress.Track>
        <Progress.Range />
      </Progress.Track>
    </Progress.Root>
  );
}
