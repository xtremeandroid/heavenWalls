import React, { useState } from "react";
import { Container, HStack, Heading } from "@chakra-ui/react";
import Loader from "../components/Loader";
import WallCard from "../components/WallCard";
import Pagination from "../components/Pagination";
import {
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightAddon,
} from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";
import PageHeading from "../components/PageHeading";
import ErrorComponent from "../components/ErrorComponent";
import { useGetSearchWallsQuery } from "../slices/wallsApiSlice";

const SearchData = () => {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const changePage = (page) => {
    setPage(page);
  };

  const {
    data: walls,
    isLoading: loading,
    isError: error,
  } = useGetSearchWallsQuery({ page, searchTerm });

  return (
    <div>
      <PageHeading pageDetail={"Search For Wallpapers"} />
      <HStack
        p={"5"}
        shadow={"base"}
        bgColor={"blackAlpha.900"}
        justifyContent={"center"}
      >
        <SearchComp setSearchTerm={setSearchTerm} />
      </HStack>
      <Container maxW={"container.2xl"} overflowX={"hidden"}>
        {loading ? (
          <Loader />
        ) : error ? (
          <ErrorComponent
            message={"Some Error Occured while loading wallpapers"}
          />
        ) : (
          <>
            <HStack p={"5"} justifyContent={"center"}>
              <Heading>{`${walls.meta.total} Wallpapers Found`}</Heading>
            </HStack>
            <HStack wrap={"wrap"} justifyContent={"space-evenly"}>
              {walls.data.map((i) => (
                <WallCard key={i.id} id={i.id} thumbnail={i.thumbs.large} />
              ))}
            </HStack>
            <Pagination
              noofpages={walls.meta.last_page}
              changePage={changePage}
              page={page}
            />
          </>
        )}
      </Container>
    </div>
  );
};

const SearchComp = ({ setSearchTerm }) => {
  const [query, setQuery] = useState("");
  return (
    <>
      <InputGroup borderRadius={"6"} size="md">
        <InputLeftElement
          pointerEvents="none"
          children={<Search2Icon color="gray.600" />}
        />
        <Input
          color={"white"}
          type="text"
          placeholder="Search..."
          value={query}
          border="1px solid #949494"
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              setSearchTerm(query);
            }
          }}
        />
        <InputRightAddon p={0} border="none">
          <Button
            onClick={() => {
              setSearchTerm(query);
            }}
            size="md"
            borderLeftRadius={0}
            borderRightRadius={3.3}
            border="1px solid #949494"
          >
            Search
          </Button>
        </InputRightAddon>
      </InputGroup>
    </>
  );
};

export default SearchData;
