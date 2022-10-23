import {
  Box,
  chakra,
  Container,
  Link,
  SimpleGrid,
  Stack,
  Text,
  VisuallyHidden,
  Input,
  InputGroup,
  InputRightElement,
  Button,
} from "@chakra-ui/react";
import { FaInstagram, FaTwitter, FaYoutube, FaTelegram } from "react-icons/fa";
import { IoLogoDiscord } from "react-icons/io5";
import { BsMedium } from "react-icons/bs";
import Image from "next/image";

const SocialButton = ({ children, label, href }) => {
  return (
    <chakra.button
      rounded={"full"}
      w={8}
      h={8}
      cursor={"pointer"}
      as={"a"}
      href={href}
      display={"inline-flex"}
      alignItems={"center"}
      justifyContent={"center"}
      transition={"background 0.3s ease"}
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  );
};

const ListHeader = ({ children }) => {
  return (
    <Text
      fontWeight={"700"}
      fontSize={"lg"}
      mb={2}
      color="#AE28B0"
      textTransform="uppercase"
    >
      {children}
    </Text>
  );
};

export default function Footer({ text }) {
  return (
    <Box borderTop="1.5px solid #0024FF" background="#0C0E17">
      <Container as={Stack} maxW="container.xl" py={5} background="#0C0E17">
        <SimpleGrid
          templateColumns={{ sm: "1fr 1fr 2fr 0fr", md: "2fr 1fr 2fr 1fr" }}
          spacing={4}
        >
          <Stack spacing={4}>
            <Box>
              <Image
                src={"https://goodgamesguild.com/front/ggg/logo-with-text.png"}
                alt="Picture of the author"
                width="200px"
                height="41px"
              />
            </Box>
            <Text fontSize={"sm"}>© 2022 GGG. All rights reserved</Text>
            <Stack direction={"row"} spacing={6}>
              <SocialButton
                label={"Telegram"}
                href={"https://t.me/GoodGamesGuildChat"}
              >
                <FaTelegram size={[28, 48]} />
              </SocialButton>
              <SocialButton
                label={"Twitter"}
                href={"https://twitter.com/goodgamesguild"}
              >
                <FaTwitter size={[28, 48]} />
              </SocialButton>
              <SocialButton label={"Discord"} href={"https://t.co/DEunOdlvKY"}>
                <IoLogoDiscord size={[28, 48]} />
              </SocialButton>
              <SocialButton
                label={"Medium"}
                href={"https://medium.com/@goodgamesguild"}
              >
                <BsMedium size={[28, 48]} />
              </SocialButton>
              <SocialButton
                label={"Youtube"}
                href={
                  "https://www.youtube.com/channel/UCOew5H8OxAt_MGSYphnob3A"
                }
              >
                <FaYoutube size={[28, 48]} />
              </SocialButton>
              <SocialButton
                label={"Instagram"}
                href={"https://www.instagram.com/goodgamesguild/"}
              >
                <FaInstagram size={[28, 48]} />
              </SocialButton>
            </Stack>
          </Stack>
          <Stack align={"flex-start"}>
            <ListHeader>{text.about}</ListHeader>
            <Link href={"https://goodgamesguild.com/"} fontWeight={"700"}>
              Home
            </Link>
            <Link href={"https://blog.goodgamesguild.com/"} fontWeight={"700"}>
              Blog
            </Link>
            <Link href={"https://docs.goodgamesguild.com/"} fontWeight={"700"}>
              Whitepaper
            </Link>
            <Link href={"http://goodgameslabs.com/"} fontWeight={"700"}>
              Incubation
            </Link>
          </Stack>
          <Stack>
            <ListHeader>{text.subscribe}</ListHeader>
            <InputGroup borderRadius="10px">
              <Input
                background="#D9D9D9"
                color="black"
                placeholder="Enter your email"
                _placeholder={{ color: "black" }}
              />
              <InputRightElement w="120px">
                <Button
                  w="120px"
                  bgGradient="linear(to-r,#1C2975, #AE28B0)"
                  _hover={{
                    background: "linear(to-r,#1C2975, #AE28B0)",
                    opacity: 0.8,
                  }}
                >
                  Submit
                </Button>
              </InputRightElement>
            </InputGroup>
            {/* <Link href={"#"} fontWeight={"700"}>
              Customer Support
            </Link> */}
          </Stack>
        </SimpleGrid>
      </Container>
    </Box>
  );
}
