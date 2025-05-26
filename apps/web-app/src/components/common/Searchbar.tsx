import { Button, Input, InputGroup } from "@chakra-ui/react";
import { MagnifyingGlass } from "phosphor-react";

export default function Searchbar() {
  return (
    <InputGroup
      flex="1"
      endElement={
        <Button rounded="xl" size="xs" me="-2">
          <MagnifyingGlass />
        </Button>
      }
    >
      <Input placeholder="Search users" rounded="2xl" />
    </InputGroup>
  );
}
