import { Image, VStack } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

const WallCard = ({ id, thumbnail }) => (
  <Link to={`/wall/${id}`}>
    <VStack
      maxW={"370px"}
      width={"95%"}
      shadow={"lg"}
      p={"2"}
      m={"2"}
      m-top={"4"}
      borderRadius={"lg"}
      transition={"all 0.3s"}
      borderColor={"blackAlpha.600"}
      borderWidth={"4px"}
      css={{
        "&:hover": {
          transform: "scale(1.1)",
        },
      }}
    >
      <Image src={thumbnail} objectFit={"cover"} alt={"wallpaper"} />
    </VStack>
  </Link>
);

export default WallCard;
