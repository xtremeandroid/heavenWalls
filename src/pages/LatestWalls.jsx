import React, { useState } from "react";
import { Container, HStack } from "@chakra-ui/react";
import Loader from "../components/Loader";
import WallCard from "../components/WallCard";
import Pagination from "../components/Pagination";
import PageHeading from "../components/PageHeading";
import ErrorComponent from "../components/ErrorComponent";
import { useGetLatestWallsQuery } from "../slices/wallsApiSlice";

const LatestWalls = () => {
  const [page, setPage] = useState(1);

  const changePage = (page) => {
    setPage(page);
  };

  const {
    data: walls,
    isLoading: loading,
    isError: error,
  } = useGetLatestWallsQuery({ page });

  return (
    <div>
      <PageHeading
        pageDetail={"The latest wallpapers uploaded by our awesome community!"}
      />
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

export default LatestWalls;
