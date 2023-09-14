import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { server } from "../main";
import {
  Button,
  Container,
  HStack,
  Radio,
  RadioGroup,
  Text,
} from "@chakra-ui/react";
import Loader from "../components/Loader";
import WallCard from "../components/WallCard";
import Pagination from "../components/Pagination";
import PageHeading from "../components/PageHeading";
import { useGetRandomWallsQuery } from "../slices/wallsApiSlice";

const Random = () => {
  const [page, setPage] = useState(1);

  const changePage = (page) => {
    setPage(page);
  };

  const {
    data: walls,
    isLoading: loading,
    isError: error,
  } = useGetRandomWallsQuery({ page });

  return (
    <div>
      <PageHeading pageDetail={"Random Wallpapers - Try your luck!"} />
      <Container maxW={"container.2xl"} overflowX={"hidden"}>
        {loading ? (
          <Loader />
        ) : error ? (
          <ErrorComponent
            message={"Some Error Occured while loading wallpapers"}
          />
        ) : (
          <>
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

export default Random;
