import { useEffect, useState } from "react";
import { Box, Button, IconButton } from "@chakra-ui/react";
import { BsArrowRight, BsArrowLeft } from "react-icons/bs";
import func from "./func";

export default function Pagination({
  totalData,
  current,
  limit,
  maxPageView = 3,
  onChengePage,
}) {
  //   const [pagintaion, setPagination] = useState(
  //     func(totalData, current, limit, maxPageView)
  //   );

  //   useEffect(() => {
  //     setPagination(pagintaion)

  //     console.log(data);
  //   }, [current, limit]);

  const pagintaion = func(totalData, current, limit, maxPageView);
  
  return (
    <Box display="flex" gap="10px">
      <IconButton
        size="sm"
        aria-label="Search database"
        icon={<BsArrowLeft />}
        // colorScheme="white"
        color="black"
        bgColor="#D9D9D9"
        rounded="full"
        colorScheme="white"
        disabled={pagintaion.startPage === current}
        onClick={() => {
          onChengePage(current - 1);
        }}
      />
      {pagintaion.pages.map((val) => (
        <Button
          key={val}
          size="sm"
          rounded="full"
          bgColor={pagintaion.currentPage === val ? "#1C2975" : "#fff"}
          colorScheme="white"
          color={pagintaion.currentPage === val ? "#fff" : "#000"}
          onClick={() => {
            onChengePage(val);
          }}
        >
          {val}
        </Button>
      ))}
      <IconButton
        size="sm"
        aria-label="Search database"
        icon={<BsArrowRight />}
        // colorScheme="white"
        color="black"
        bgColor="#D9D9D9"
        rounded="full"
        colorScheme="white"
        disabled={pagintaion.totalPages === current}
        onClick={() => {
          onChengePage(current + 1);
        }}
      />
    </Box>
  );
}
