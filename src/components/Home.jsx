import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { server } from "../main";
import { Container, HStack } from "@chakra-ui/react";
import Loader from "./Loader";
import WallCard from "./WallCard";
import PageHeading from "./PageHeading";

const Home = () => {
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
    <div>
      <PageHeading pageDetail={"HeavenWalls - The Best Wallpapers on the Net !"}/>
    
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
    </div>
  );
};

export default Home;
