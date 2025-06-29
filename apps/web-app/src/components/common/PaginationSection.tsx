import { ButtonGroup, IconButton, Pagination } from "@chakra-ui/react";
import { CaretLeft, CaretRight } from "phosphor-react";
import type { Dispatch, SetStateAction } from "react";

type PaginationProps = {
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  totalItems: number;
};

export default function PaginationSection({
  currentPage,
  setCurrentPage,
  totalItems,
}: PaginationProps) {
  return (
    <Pagination.Root
      count={totalItems}
      pageSize={10}
      page={currentPage}
      onPageChange={e => setCurrentPage(e.page)}
      width="fit-content"
      mx="auto"
      mt="10"
    >
      <ButtonGroup gap="4" size="sm" variant="ghost">
        <Pagination.PrevTrigger asChild>
          <IconButton>
            <CaretLeft size={32} />
          </IconButton>
        </Pagination.PrevTrigger>
        <Pagination.PageText />
        <Pagination.NextTrigger asChild>
          <IconButton>
            <CaretRight size={32} />
          </IconButton>
        </Pagination.NextTrigger>
      </ButtonGroup>
    </Pagination.Root>
  );
}
