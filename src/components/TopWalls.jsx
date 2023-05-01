import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { server } from "../main";
import { Button, Container, HStack, Radio, RadioGroup, Text } from "@chakra-ui/react";
import Loader from "./Loader";
import WallCard from "./WallCard";
import Pagination from "./Pagination";
import PageHeading from "./PageHeading";

const TopWalls = () => {
  const [walls, setWalls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toprange, setToprange] = useState("1d");
  const [page, setPage] = useState(1);
  const [days, setDays] = useState("24 Hours");

  const changePage = (page) => {
    setPage(page);
    setLoading(true);
  };

  useEffect(() => {
    const fetchWalls = async () => {
      const {data} = await axios.get(`${server}/search?sorting=toplist&topRange=${toprange}&page=${page}`);
      setWalls(data);
      setLoading(false);

      if(toprange == "1d"){setDays("24 Hours")}
      if(toprange == "3d"){setDays("3 Days")}
      if(toprange == "1w"){setDays("Week")}
      if(toprange == "1M"){setDays("Month")}
      if(toprange == "3M"){setDays("3 Month")}
      if(toprange == "6M"){setDays("6 Month")}
      if(toprange == "1Y"){setDays("Year")}


    };
    fetchWalls();
    
  }, [toprange, page]);




  return (<div>
    <PageHeading pageDetail={`Top Walls Last ${days}`}/>
    <Container maxW={"container.xl"}>{loading ? <Loader /> : (
      <>
        
        <RadioGroup value={toprange} onChange={setToprange} p={"8"}>
            <HStack spacing={"4"}>
        <Text fontSize={"xl"} fontWeight={"semibold"}>SELECT CUSTOM RANGE</Text>    
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

export default TopWalls;
