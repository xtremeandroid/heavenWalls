import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { server } from "../main";
import Loader from "./Loader";
import {
  Button,
  Center,
  Container,
  HStack,
  Image,
  VStack,
} from "@chakra-ui/react";

const WallpaperPage = () => {
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [walls, setWalls] = useState([]);

  useEffect(() => {
    const fetchWalls = async () => {
      const { data } = await axios.get(`${server}/w/${params.id}`);
      setWalls(data);
      setLoading(false);
    };
    fetchWalls();
  }, [params.id]);

  return (
    <Container justifyContent={"center"} maxW={"100%"}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <HStack justifyContent={"center"}>
            <BigWallCard
              key={walls.data.id}
              id={walls.data.id}
              thumbnail={walls.data.path}
            />
          </HStack>
        </>
      )}
    </Container>
  );
};

const BigWallCard = ({ id, thumbnail }) => (
  <VStack w={"full"} p={"4"} borderRadius={"lg"}>
    <Button variant={"unstyled"} bgColor={"green.900"} color={"white"} p={"2"}>
      <a href={thumbnail} target="_blank">
        Download This WallPaper
      </a>
    </Button>
    <Image src={thumbnail} objectFit={"cover"} alt={"wallpaper"} />
  </VStack>
);

export default WallpaperPage;
