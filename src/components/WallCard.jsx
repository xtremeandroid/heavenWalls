import { Image, VStack } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

const WallCard = ({ id, thumbnail}) => (
  <Link to={`/coin/${id}`}>
    <VStack
      w={"400px"}
      shadow={"lg"}
      p={"3"}
      borderRadius={"lg"}
      transition={"all 0.3s"}
      css={{
        "&:hover": {
          transform: "scale(1.1)",
        },
      }}
    >
      <Image
        src={thumbnail}
        objectFit={"cover"}
        alt={"wallpaper"}
      />

    </VStack>
  </Link>
);

export default WallCard;