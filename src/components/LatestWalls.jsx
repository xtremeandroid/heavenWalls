import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { server } from "../main";
import { Container, HStack } from "@chakra-ui/react";
import Loader from "./Loader";
import WallCard from "./WallCard";

const LatestWalls = () => {
  const [walls, setWalls] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWalls = async () => {
      const {data} = await axios.get(`${server}/search`);
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

export default LatestWalls;
