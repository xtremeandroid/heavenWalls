import { Button, HStack } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <HStack p={"4"} shadow={"base"} bgColor={"blackAlpha.900"} spacing={"5"}>
      <Button variant={"unstyled"} color={"white"}>
        <Link to="/">Home</Link>
      </Button>
      <Button variant={"unstyled"} color={"white"}>
        <Link to="/top">TopList</Link>
      </Button>
      <Button variant={"unstyled"} color={"white"}>
        <Link to="/latest">Latest</Link>
      </Button>
      <Button variant={"unstyled"} color={"white"}>
        <Link to="/random">Random</Link>
      </Button>
      <Button variant={"unstyled"} color={"white"}>
        <Link to="/search">Search</Link>
      </Button>
    </HStack>
  );
};

export default Header;
