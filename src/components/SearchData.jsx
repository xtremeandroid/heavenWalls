import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { server } from "../main";
import { Center, Container, HStack } from "@chakra-ui/react";
import Loader from "./Loader";
import WallCard from "./WallCard";
import Pagination from "./Pagination";
import { Button, Input, InputGroup, InputLeftElement, InputRightAddon } from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";


const SearchData = () => {
  const [walls, setWalls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const changePage = (page) => {
    setPage(page);
    setLoading(true);
  };


  useEffect(() => {
    const fetchWalls = async () => {
      const {data} = await axios.get(`${server}/search?q=${searchTerm}`);
      setWalls(data);
      setLoading(false);
    };
    fetchWalls();
  }, [page, searchTerm]);

  return (<div>
    <HStack p={"5"} shadow={"base"} bgColor={'blackAlpha.900'} justifyContent={"center"}>
        <SearchComp setSearchTerm={setSearchTerm}/>
      </HStack>
    <Container maxW={"container.xl"}>{loading ? <Loader /> : (
      <>
        <HStack wrap={"wrap"} justifyContent={"space-evenly"}>
          {walls.data.map((i) => (
            <WallCard
              key={i.id}
              id={i.id}
              thumbnail={i.thumbs.large}
            />
          ))}
        </HStack>
        <Pagination noofpages={walls.meta.last_page} changePage={changePage} page={page}/>
      </>
    )}</Container>
    </div>
  );
};

const SearchComp = ({setSearchTerm}) => {
    const [query, setQuery] = useState("")
    return (
      <>
        <InputGroup borderRadius={5} size="sm" w={"600px"}> 
          <InputLeftElement
            pointerEvents="none"
            children={<Search2Icon color="gray.600" />}
          />
          <Input color={"white"} type="text" placeholder="Search..." value={query} border="1px solid #949494" onChange={(e) => setQuery(e.target.value)}/>
          <InputRightAddon
            p={0}
            border="none"
          >
            <Button onClick={()=>{setSearchTerm(query)}} size="sm" borderLeftRadius={0} borderRightRadius={3.3} border="1px solid #949494">
              Search
            </Button>
          </InputRightAddon>
        </InputGroup>
      </>
    );
  };


export default SearchData;
