import React, { useState } from "react";
import { Container, HStack } from "@chakra-ui/react";
import Loader from "../components/Loader";
import WallCard from "../components/WallCard";
import PageHeading from "../components/PageHeading";
import { useGetHomeQuery } from "../slices/wallsApiSlice";
import ErrorComponent from "../components/ErrorComponent";

const Home = () => {
  const { data: walls, isLoading, isError: error } = useGetHomeQuery();

  return (
    <div>
      <PageHeading
        pageDetail={"HeavenWalls - The Best Wallpapers on the Net."}
      />

      <Container maxW={"container.2xl"} overflowX={"hidden"}>
        {isLoading ? (
          <Loader />
        ) : error ? (
          <ErrorComponent
            message={`Some error has occured while loading data : ${
              error?.data?.message || error?.error
            }`}
          />
        ) : (
          <>
            <HStack wrap={"wrap"} justifyContent={"space-evenly"}>
              {walls.data.map((i) => (
                <WallCard key={i.id} id={i.id} thumbnail={i.thumbs.large} />
              ))}
            </HStack>
          </>
        )}
      </Container>
    </div>
  );
};

export default Home;
