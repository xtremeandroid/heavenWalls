import React, { useEffect, useState } from "react";
import { Container, HStack, Radio, RadioGroup, Text } from "@chakra-ui/react";
import Loader from "../components/Loader";
import WallCard from "../components/WallCard";
import Pagination from "../components/Pagination";
import PageHeading from "../components/PageHeading";
import { useGetTopWallsQuery } from "../slices/wallsApiSlice";
import ErrorComponent from "../components/ErrorComponent";

const TopWalls = () => {
  const [toprange, setToprange] = useState("1d");
  const [days, setDays] = useState("24 Hours");
  const [page, setPage] = useState(1);

  const changePage = (page) => {
    setPage(page);
  };

  const {
    data: walls,
    isLoading: loading,
    isError: error,
  } = useGetTopWallsQuery({ page, toprange });

  console.log(walls);

  useEffect(() => {
    if (toprange == "1d") {
      setDays("24 Hours");
    }
    if (toprange == "3d") {
      setDays("3 Days");
    }
    if (toprange == "1w") {
      setDays("Week");
    }
    if (toprange == "1M") {
      setDays("Month");
    }
    if (toprange == "3M") {
      setDays("3 Month");
    }
    if (toprange == "6M") {
      setDays("6 Month");
    }
    if (toprange == "1Y") {
      setDays("Year");
    }
  }, [toprange]);

  return (
    <div>
      <PageHeading pageDetail={`Top Walls Last ${days}`} />
      <Container maxW={"container.2xl"} overflowX={"hidden"}>
        {loading ? (
          <Loader />
        ) : error ? (
          <ErrorComponent
            message={"Some Error Occured while loading wallpapers"}
          />
        ) : page > walls.meta.last_page ? (
          <ErrorComponent
            message={
              "No more wallpapers available in this range. Please choose a different time range or explore other categories."
            }
          />
        ) : (
          <>
            <RadioGroup value={toprange} onChange={setToprange} p={"8"}>
              <HStack
                spacing={"4"}
                display={"flex"}
                flexWrap={"wrap"}
                fontSize={"xl"}
                fontWeight={"semibold"}
              >
                <Text>SELECT RANGE</Text>
                <Radio value={"1d"}>24H</Radio>
                <Radio value={"3d"}>3D</Radio>
                <Radio value={"1w"}>1W</Radio>
                <Radio value={"1M"}>1M</Radio>
                <Radio value={"3M"}>3M</Radio>
                <Radio value={"6M"}>6M</Radio>
                <Radio value={"1Y"}>1Y</Radio>
              </HStack>
            </RadioGroup>

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

export default TopWalls;
