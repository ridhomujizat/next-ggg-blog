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
  Center,
  Flex,
  Divider,
} from "@chakra-ui/react";
import { useRef, useState, useLayoutEffect } from "react";
import Image from "next/image";
import IcTele from "assets/ic_telegram.png";
import IcTwitter from "assets/ic_twitter.png";
import IcDiscord from "assets/ic_discord.png";
import IcMedium from "assets/ic_medium.png";
import IcYoutube from "assets/ic_youtube.png";
import IcInstagram from "assets/ic_instagram.png";
import IcFooter1 from "assets/ic_footer1.png";
import IcFooter2 from "assets/ic_footer2.png";
import IcFooter3 from "assets/ic_footer3.png";
import IcFooter4 from "assets/ic_footer4.png";
import IcFooter5 from "assets/ic_footer5.png";
import IcSolana from "assets/ic_solana.png";

const SocialButton = ({ children, label, href }) => {
  return (
    <chakra.button
      rounded={"full"}
      w={"2.5rem"}
      h={"2.5rem"}
      cursor={"pointer"}
      as={"a"}
      href={href}
      display={"inline-flex"}
      alignItems={"center"}
      justifyContent={"center"}
      transition={"background 0.3s ease"}
      background="#DF21C0"
      borderRadius="13px"
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
  const sosmedList = [
    {
      id: "1",
      label: "Telegram",
      href: "https://t.me/GoodGamesGuildChat",
      icon: <Image src={IcTele} width="25px" height="25px" alt="Telegram" />,
    },
    {
      id: "2",
      label: "Twitter",
      href: "https://twitter.com/goodgamesguild",
      icon: <Image src={IcTwitter} width="25px" height="25px" alt="Twitter" />,
    },
    {
      id: "3",
      label: "Discord",
      href: "https://t.co/DEunOdlvKY",
      icon: <Image src={IcDiscord} width="25px" height="25px" alt="Discord" />,
    },
    {
      id: "4",
      label: "Medium",
      href: "https://medium.com/@goodgamesguild",
      icon: <Image src={IcMedium} width="25px" height="25px" alt="Medium" />,
    },
    {
      id: "5",
      label: "Youtube",
      href: "https://www.youtube.com/channel/UCOew5H8OxAt_MGSYphnob3A",
      icon: <Image src={IcYoutube} width="25px" height="19px" alt="Youtube" />,
    },
    {
      id: "6",
      label: "Instagram",
      href: "https://www.instagram.com/goodgamesguild/",
      icon: (
        <Image src={IcInstagram} width="25px" height="25px" alt="Instagram" />
      ),
    },
  ];

  const aboutList = [
    {
      id: "1",
      title: "Home",
      href: "https://goodgamesguild.com/",
    },
    {
      id: "2",
      title: "About Us",
      href: "/about-us",
    },
    {
      id: "3",
      title: "Incubation",
      href: "http://goodgameslabs.com/",
    },
    {
      id: "4",
      title: "Whitepaper",
      href: "https://docs.goodgamesguild.com/",
    },
    {
      id: "5",
      title: "Contact",
      href: "https://goodgamesguild.com/contact",
    },
  ];

  const footerList = [
    {
      id: "1",
      image: <Image src={IcFooter1} alt="footer1" width="32px" height="45px" />,
    },
    {
      id: "2",
      image: <Image src={IcFooter2} alt="footer2" width="45px" height="45px" />,
    },
    {
      id: "3",
      image: <Image src={IcFooter3} alt="footer3" width="45px" height="45px" />,
    },
    {
      id: "4",
      image: <Image src={IcFooter4} alt="footer4" width="45px" height="45px" />,
    },
    {
      id: "5",
      image: <Image src={IcFooter5} alt="footer5" width="45px" height="45px" />,
    },
    {
      id: "6",
      image: (
        <Image src={IcSolana} alt="solana.png" width="45px" height="45px" />
      ),
    },
  ];

  const ref = useRef(null);

  const [width, setWidth] = useState(0);

  useLayoutEffect(() => {
    setWidth(ref.current.offsetWidth);
  }, []);

  return (
    <Box background="#1C2734" ref={ref}>
      <Container as={Stack} maxW="container.xl" py={5} background="#1C2734">
        {/* <SimpleGrid
          templateColumns={{ sm: "1fr 1fr 2fr 0fr", md: "1fr 1fr 2fr 0fr" }}
          spacing={4}
        > */}
        <Flex
          flexDirection={["column", "column", "row"]}
          spacing="4"
          // flexWrap="wrap"
          columnGap="4"
          rowGap="4"
        >
          <Flex flex={1}>
            <Stack spacing={4}>
              <Box>
                <Image
                  src={
                    "https://goodgamesguild.com/front/ggg/logo-with-text.png"
                  }
                  alt="Picture of the author"
                  width="200px"
                  height="41px"
                />
              </Box>

              <Flex
                flexDirection="row"
                flexWrap="wrap"
                columnGap={4}
                rowGap={4}
              >
                {sosmedList.map((o) => (
                  <SocialButton key={o.id} label={o.label} href={o.href}>
                    {o.icon}
                  </SocialButton>
                ))}
              </Flex>
            </Stack>
          </Flex>
          <Flex flex={0.5}>
            <Stack align={"flex-start"}>
              <ListHeader>{text.about}</ListHeader>
              {aboutList.map((o) => (
                <Link
                  key={o.id}
                  href={o.href}
                  fontWeight={"700"}
                  color="#FFFFFF"
                  opacity={0.7}
                >
                  {o.title}
                </Link>
              ))}
              {/* <Link href={"https://goodgamesguild.com/"} fontWeight={"700"}>
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
            </Link> */}
            </Stack>
          </Flex>
          <Flex flex={2}>
            <Stack spacing="4">
              <ListHeader>{text.subscribe}</ListHeader>
              {width > 480 ? (
                <InputGroup borderRadius="10px">
                  <Input
                    background="#D9D9D9"
                    color="black"
                    placeholder="Enter your email"
                    _placeholder={{ color: "black" }}
                    h="56px"
                  />
                  <InputRightElement w="120px" h="100%">
                    <Flex justify="center">
                      <Button
                        w="110px"
                        h="39px"
                        // bgGradient="linear(to-r,#1C2975, #AE28B0)"
                        background="#DF21C0"
                        _hover={{
                          background: "#DF21C0",
                          opacity: 0.8,
                        }}
                      >
                        Submit
                      </Button>
                    </Flex>
                  </InputRightElement>
                </InputGroup>
              ) : (
                <InputGroup borderRadius="10px">
                  <Stack>
                    <Input
                      background="#D9D9D9"
                      color="black"
                      placeholder="Enter your email"
                      _placeholder={{ color: "black" }}
                      h="56px"
                    />
                    <Flex justify="center">
                      <Button
                        w="110px"
                        h="39px"
                        // bgGradient="linear(to-r,#1C2975, #AE28B0)"
                        background="#DF21C0"
                        _hover={{
                          background: "#DF21C0",
                          opacity: 0.8,
                        }}
                      >
                        Submit
                      </Button>
                    </Flex>
                  </Stack>
                </InputGroup>
              )}
              <Stack spacing="4">
                <Center>
                  <Text color="#CF00CA" fontWeight="semibold">
                    A Decentralised Metaverse
                  </Text>
                </Center>
                <Center>
                  <Text color="#CF00CA" fontWeight="light" fontStyle="italic">
                    Powering Multi-chain GameFi Ecosystem
                  </Text>
                </Center>
                <Center>
                  <Stack direction="row" gap="5" width="100%">
                    {footerList.map((o) => o.image)}
                  </Stack>
                </Center>
              </Stack>
              {/* <Link href={"#"} fontWeight={"700"}>
              Customer Support
            </Link> */}
            </Stack>
          </Flex>
        </Flex>
        {/* </SimpleGrid> */}
        <Box>
          <Center>
            <Stack spacing="4" width="70%">
              <Center>
                <Divider />
              </Center>
              <Center>
                <Text fontSize={"sm"} fontWeight="semibold">
                  © 2022 Good Games Guild | All rights reserved
                </Text>
              </Center>
            </Stack>
          </Center>
        </Box>
      </Container>
    </Box>
  );
}
