import { Button, HStack, Input, InputGroup, InputLeftElement, InputRightAddon } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'
import { Search2Icon } from "@chakra-ui/icons";


const Header = () => {
  return <HStack p={"4"} shadow={"base"} bgColor={'blackAlpha.900'} spacing={"5"}>
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
    <SearchBar />
  </HStack>
}

export default Header

const SearchBar = () => {
  return (
    <>
      <InputGroup borderRadius={5} size="sm" w={"600px"}> 
        <InputLeftElement
          pointerEvents="none"
          children={<Search2Icon color="gray.600" />}
        />
        <Input type="text" placeholder="Search..." border="1px solid #949494"/>
        <InputRightAddon
          p={0}
          border="none"
        >
          <Button size="sm" borderLeftRadius={0} borderRightRadius={3.3} border="1px solid #949494">
            Search
          </Button>
        </InputRightAddon>
      </InputGroup>
    </>
  );
};
