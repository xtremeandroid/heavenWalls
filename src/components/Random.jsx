import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { server } from "../main";
import { Button, Container, HStack, Radio, RadioGroup, Text } from "@chakra-ui/react";
import Loader from "./Loader";
import WallCard from "./WallCard";
import Pagination from "./Pagination";
import PageHeading from "./PageHeading";

const Random = () => {
  const [walls, setWalls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  const changePage = (page) => {
    setPage(page);
    setLoading(true);
  };

  useEffect(() => {
    const fetchWalls = async () => {
      const {data} = await axios.get(`${server}/search?sorting=random`);
      setWalls(data);
      setLoading(false);

    };
    fetchWalls();
    
  }, []);


  return (<div>
    <PageHeading pageDetail={"Random Wallpapers - Try your luck!"}/>
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

export default Random;
