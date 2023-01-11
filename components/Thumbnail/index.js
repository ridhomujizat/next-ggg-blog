import React from "react";
import NextLink from "next/link";
import { Box, Spacer, Text } from "@chakra-ui/react";

export default function Thumbnail({ title, date, imageUrl, slug, height }) {
  return (
    <NextLink href={`/blog/${slug}`}>
      <a>
        <Box cursor="pointer">
          <Box
            as="img"
            w="100%"
            src={imageUrl}
            // h={{ sm: "40vh", md: "25vh", lg: "25vh" }}
            height={height ?? ["200px", "205px", "350px", "160px"]}
            bg="linear-gradient(251.96deg, #0F111D -17.89%, #1C2975 133.73%)"
            border="0.861546px solid #FFFFFF"
            borderRadius={20}
            objectFit="cover"
            objectPosition="right top"
          ></Box>
          <Spacer h={5} />
          <Text noOfLines={2}
            fontSize="xl"
            fontWeight="700"
            textOverflow="ellipsis"
            overflow="hidden"
          >
            {title}
          </Text>
          <Text>{date}</Text>
        </Box>
      </a>
    </NextLink>
  );
}
