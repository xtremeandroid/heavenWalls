import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import { Button, Container, Image, VStack, useToast } from "@chakra-ui/react";
import { useGetFetchWallQuery } from "../slices/wallsApiSlice";
import { useSelector } from "react-redux";
import {
  useGetLikedWallsQuery,
  useLikeWallpaperMutation,
} from "../slices/wallsApiSlice";
import { useDispatch } from "react-redux";

const WallpaperPage = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const { id } = useParams();
  const { data: walls, isLoading: loading } = useGetFetchWallQuery({ id });
  const { userInfo } = useSelector((state) => state.auth);
  const [liked, setLiked] = useState(false);
  const dispatch = useDispatch();
  const { data: likedWalls } = useGetLikedWallsQuery({
    id: userInfo ? userInfo._id : "",
  });

  const [likeWall] = useLikeWallpaperMutation();

  useEffect(() => {
    if (likedWalls && likedWalls.likedWallpapers) {
      const isWallLiked = likedWalls.likedWallpapers.some(
        (wall) => wall.wallid === id
      );
      setLiked(isWallLiked);
    }
  }, [likedWalls, id]);

  const handleLike = async () => {
    if (userInfo) {
      const res = await likeWall({ userId: userInfo._id, id });
      setLiked((prev) => !prev);
    } else {
      toast({
        title: "Please Register or Login to like a wallpaper",
        description: "",
        status: "error",
        isClosable: true,
        colorScheme: "teal",
      });
      navigate("/login");
    }
  };

  return (
    <Container
      justifyContent={"center"}
      maxW={"full"}
      overflowX={"hidden"}
      backgroundColor={"blackAlpha.900"}
    >
      {loading ? (
        <Loader />
      ) : (
        <>
          <Container
            display={"flex"}
            justifyContent={"space-evenly"}
            flexWrap={"wrap"}
            p={"4"}
          >
            {liked ? (
              <LikeButton
                handleLike={handleLike}
                title={"Remove from My Liked Wallpapers"}
              />
            ) : (
              <LikeButton
                handleLike={handleLike}
                title={"Add to My Liked Wallpapers"}
              />
            )}
            <DownloadButton thumbnail={walls.data.path} />
          </Container>
          <VStack>
            <BigWallCard
              key={walls.data.id}
              id={walls.data.id}
              thumbnail={walls.data.path}
            />
          </VStack>
        </>
      )}
    </Container>
  );
};

const BigWallCard = ({ id, thumbnail }) => (
  <VStack w={"full"} p={"4"} borderRadius={"lg"}>
    <Image src={thumbnail} objectFit={"cover"} alt={"wallpaper"} />
  </VStack>
);

const DownloadButton = ({ thumbnail }) => (
  <Button
    variant={"unstyled"}
    bgColor={"green.900"}
    color={"white"}
    p={"2"}
    m={"2"}
  >
    <a href={thumbnail} target="_blank">
      Download This WallPaper
    </a>
  </Button>
);

const LikeButton = ({ handleLike, title }) => (
  <Button
    onClick={handleLike}
    variant={"unstyled"}
    bgColor={"green.900"}
    color={"white"}
    p={"2"}
    m={"2"}
  >
    {title}
  </Button>
);

export default WallpaperPage;
