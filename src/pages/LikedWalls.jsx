import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useGetLikedWallsQuery } from "../slices/wallsApiSlice";
import PageHeading from "../components/PageHeading";
import { Container, HStack, Text } from "@chakra-ui/react"; // Import Text component
import ErrorComponent from "../components/ErrorComponent";
import Loader from "../components/Loader";
import WallCard from "../components/WallCard";

const LikedWalls = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const {
    data: likes,
    isLoading,
    isError: error,
  } = useGetLikedWallsQuery({
    id: userInfo ? userInfo._id : "",
  });

  const navigate = useNavigate();
  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
  }, [userInfo, navigate]);

  return (
    <div>
      <PageHeading pageDetail={"Your Liked Wallpapers Collection"} />

      <Container maxW={"container.2xl"} overflowX={"hidden"}>
        {isLoading ? (
          <Loader />
        ) : error ? (
          <ErrorComponent
            message={`Some error has occurred while loading data : ${
              error?.data?.message || error?.error
            }`}
          />
        ) : likes.likedWallpapers.length === 0 ? ( // Check if no wallpapers are liked
          <Text textAlign="center" mt="4" fontSize={"4xl"}>
            Please Like Some Wallpapers.
          </Text>
        ) : (
          <>
            <HStack wrap={"wrap"} justifyContent={"space-evenly"}>
              {likes.likedWallpapers.map((i) => (
                <WallCard
                  key={i.wallid}
                  id={i.wallid}
                  thumbnail={i.thumbnail}
                />
              ))}
            </HStack>
          </>
        )}
      </Container>
    </div>
  );
};

export default LikedWalls;
