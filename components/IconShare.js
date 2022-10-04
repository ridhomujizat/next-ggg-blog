import { Box, Icon, Text } from "@chakra-ui/react";
import { BsFacebook, BsTwitter, BsLinkedin, BsWhatsapp } from "react-icons/bs";

const socialItems = [
  {
    path: "https://www.facebook.com/sharer/sharer.php?u=",
    icon: BsFacebook,
  },
  {
    path: "https://twitter.com/intent/tweet?url=",
    icon: BsTwitter,
  },
  {
    path: "https://www.linkedin.com/sharing/share-offsite/?url=",
    icon: BsLinkedin,
  },
  {
    path: "https://wa.me/?text=",
    icon: BsWhatsapp,
  },
];

const ImageShare = ({ src, onClick }) => {
  return (
    <Box
      sx={{
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
      }}
      onClick={onClick}
    >
      <Icon as={src} fontSize={["20px", "25px", "30px"]} />
    </Box>
  );
};

export const ShareHorizontal = ({ text }) => {
  return (
    <Box display="flex" gap="20px">
      <Text>{text}:</Text>
      {socialItems.map((val) => (
        <ImageShare
          src={val.icon}
          alt="icon"
          onClick={() => {
            window.open(`${val.path}${window.location.href.toString()}`);
          }}
          key={val.path}
        />
      ))}
    </Box>
  );
};

export default ShareHorizontal