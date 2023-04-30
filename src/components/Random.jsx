import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { server } from "../main";
import { Button, Container, HStack, Radio, RadioGroup, Text } from "@chakra-ui/react";
import Loader from "./Loader";
import WallCard from "./WallCard";

const Random = () => {
  const [walls, setWalls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchWalls = async () => {
      const {data} = await axios.get(`${server}/search?sorting=random`);
      setWalls(data);
      setLoading(false);

    };
    fetchWalls();
    
  }, []);


  return (
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
      </>
    )}</Container>
  );
};

export default Random;
