import { Button, HStack } from "@chakra-ui/react";

const Pagination = ({ noofpages, changePage, page }) => {
  return (
    <HStack w={"full"} overflowX={"auto"} p={"8"}>
      <Button
        bgColor={"blackAlpha.900"}
        color={"white"}
        onClick={() => changePage(1)}
      >
        1
      </Button>
      <Button
        bgColor={"blackAlpha.900"}
        color={"white"}
        onClick={() => changePage(page + 1)}
      >
        NEXT
      </Button>
      <Button
        bgColor={"blackAlpha.900"}
        color={"white"}
        onClick={() => changePage(page - 1)}
      >
        PREV
      </Button>

      <Button
        bgColor={"blackAlpha.900"}
        color={"white"}
        onClick={() => changePage(noofpages)}
      >
        LAST
      </Button>
    </HStack>
  );
};

export default Pagination;
