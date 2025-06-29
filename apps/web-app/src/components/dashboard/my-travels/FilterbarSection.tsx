import { NativeSelect } from "@chakra-ui/react";
import type { Dispatch, SetStateAction } from "react";

type FilterbarProps = {
  selectedYear: string | undefined;
  setSelectedYear: Dispatch<SetStateAction<string | undefined>>;
};

export default function FilterbarSection({ selectedYear, setSelectedYear }: FilterbarProps) {
  return (
    <div css={{ marginBottom: "20px" }}>
      <NativeSelect.Root width="150px">
        <NativeSelect.Field
          placeholder="Filter by Year"
          value={selectedYear}
          onChange={e => setSelectedYear(e.currentTarget.value)}
        >
          <option value="2021">2021</option>
          <option value="2022">2022</option>
          <option value="2023">2023</option>
          <option value="2024">2024</option>
          <option value="2025">2025</option>
        </NativeSelect.Field>
        <NativeSelect.Indicator />
      </NativeSelect.Root>
    </div>
  );
}
