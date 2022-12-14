import React from "react";
import { WrapItem, Center, Image, Text } from "@chakra-ui/react";

export default function Label({ imageUrl, title, onClick }) {
  return (
    <WrapItem>
      <Center
        bg="linear-gradient(251.96deg, #0F111D -17.89%, #1C2975 133.73%);"
        border="1px solid #FFFFFF"
        borderRadius={20}
        px="15px"
        py="10px"
        cursor="pointer"
        onClick={onClick}
      >
        {imageUrl && (
          <Image
            src={imageUrl}
            alt="Picture of the author"
            width="30px"
            height="30px"
          />
        )}

        <Text fontWeight={700} marginLeft={imageUrl? 2 : 0} fontSize={["12px",null,"15px"]}>
          {title}
        </Text>
      </Center>
    </WrapItem>
  );
}
