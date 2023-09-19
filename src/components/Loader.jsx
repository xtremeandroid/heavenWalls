import { Box, Spinner, VStack } from "@chakra-ui/react";
import React from "react";

const Loader = ({ size }) => {
  return (
    <VStack h={"40vh"} justifyContent={"center"}>
      <Box transform={"scale(2)"}>
        <Spinner size={"xl"} />
      </Box>
    </VStack>
  );
};

export default Loader;
