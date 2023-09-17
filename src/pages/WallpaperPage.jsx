import React from "react";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";
import { Button, Container, HStack, Image, VStack } from "@chakra-ui/react";
import { useGetFetchWallQuery } from "../slices/wallsApiSlice";

const WallpaperPage = () => {
  const { id } = useParams();
  const { data: walls, isLoading: loading } = useGetFetchWallQuery({ id });

  return (
    <Container
      justifyContent={"center"}
      maxW={"container.2xl"}
      overflowX={"hidden"}
    >
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
