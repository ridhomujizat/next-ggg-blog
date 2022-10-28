import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  Container,
  Box,
  Button,
  Text,
  IconButton,
  Image as ImageStyle,
  Stack,
  Link,
  Flex,
  CloseButton,
} from "@chakra-ui/react";
import { BsPersonFill, BsX } from "react-icons/bs";
import Cookies from "js-cookie";
import useAuthStore from "store/authStore";
import { HamburgerIcon } from "@chakra-ui/icons";

const langList = ["en", "idn"];

export default function Navbar({ currentLang, text }) {
  const router = useRouter();
  const { isLogin, user, setLogout } = useAuthStore((state) => state);
  const [auth, setAuth] = useState({ isLogin: false, user: null });

  const navbarList = [
    {
      id: "1",
      title: "Staking",
      href: "https://staking.goodgamesguild.com/farms",
    },
    {
      id: "2",
      title: "Metakey",
      href: "https://metakey.goodgamesguild.com/",
    },
    {
      id: "3",
      title: "Whitepaper",
      href: "https://docs.goodgamesguild.com/",
    },
    {
      id: "4",
      title: "Campaign",
      href: "https://goodgamesguild.com/gleam",
    },
    {
      id: "5",
      title: "Portal Blog",
      href: "https://goodgamesguild.com/#",
    },
  ];

  const [changeDisplay, setChangeDisplay] = useState("none");

  useEffect(() => {
    setAuth({ isLogin, user });
  }, []);

  const changeLang = (value) => {
    Cookies.set("lang", value);
    window.location.reload();
  };

  const handleLogout = () => {
    Cookies.remove("token");
    setLogout();
    router.reload(window.location.pathname);
    router.push("/");
  };

  return (
    <Box
      borderBottom="1.5px solid rgba(255, 255, 255, 0.5)"
      marginBottom="10px"
      position={"sticky"}
      top="0"
      zIndex={100}
      background={"#0C0E17"}
    >
      <Container maxW="container.xl">
        <Box as="header" sx={sx.header}>
          <Link href="/">
            <Image
              src={"https://goodgamesguild.com/front/ggg/logo-with-text.png"}
              alt="Picture of the author"
              width="200px"
              height="41px"
            />
          </Link>
          <Flex display={["none", "none", "flex"]}>
            <Box sx={sx.nav}>
              <Stack direction="row" spacing={4}>
                {navbarList.map((o) => (
                  <Box key={o.id}>
                    <Link href={o.href}>
                      <Text cursor="pointer">{o.title}</Text>
                    </Link>
                  </Box>
                ))}
              </Stack>
              {auth.isLogin ? (
                <>
                  <Text fontWeight="bold">Hi, {auth.user.username}</Text>
                  {auth.user?.image_url ? (
                    <Link href="/profile">
                      <Box>
                        <ImageStyle
                          src={auth.user.image_url}
                          alt={auth.user.username}
                          borderRadius="full"
                          objectFit="cover"
                          boxSize="50px"
                        />
                      </Box>
                    </Link>
                  ) : (
                    <IconButton rounded="full">
                      <BsPersonFill />
                    </IconButton>
                  )}
                  <Button variant="outline" onClick={handleLogout}>
                    {text.logout}
                  </Button>
                </>
              ) : (
                <>
                  {/* <Link href="/login">
                  <Button variant="outline">{text.login}</Button>
                </Link>
                <Link href="/register">
                  <Button variant="outline">{text.register}</Button>
                </Link> */}
                </>
              )}

              <Box sx={sx.lang}>
                {langList.map((val, i) => (
                  <React.Fragment key={i}>
                    <Text
                      as="b"
                      sx={sx.textLang}
                      key={i}
                      cursor={val !== currentLang ? "pointer" : "default"}
                      color={val === currentLang ? "inherit" : "#363636"}
                      onClick={() => changeLang(val)}
                    >
                      {val}
                    </Text>
                    {i !== langList.length - 1 && <Text>|</Text>}
                  </React.Fragment>
                ))}
              </Box>
            </Box>
          </Flex>
          <IconButton
            size="lg"
            aria-label="Open Menu"
            mr={2}
            icon={<HamburgerIcon />}
            display={["flex", "flex", "none"]}
            onClick={() => setChangeDisplay("flex")}
          />
        </Box>
        <Flex
          flexDir="column"
          background={"#0C0E17"}
          w="100vw"
          h="100vh"
          zIndex={20}
          pos="fixed"
          top="0"
          left="0"
          overflowY="auto"
          display={changeDisplay}
        >
          <div>
            <Flex justify="flex-end">
              <IconButton
                mt={2}
                mr={5}
                aria-label="Close Menu"
                size="lg"
                icon={<BsX />}
                onClick={() => setChangeDisplay("none")}
              />
            </Flex>
            <Flex flexDir="column" align="center" justify="center">
              <Stack
                direction="column"
                spacing={4}
                justify="center"
                align="center"
              >
                {navbarList.map((o) => (
                  <Box key={o.id}>
                    <Link href={o.href}>
                      <Text cursor="pointer">{o.title}</Text>
                    </Link>
                  </Box>
                ))}
              </Stack>
              {auth.isLogin ? (
                <>
                  <Text fontWeight="bold">Hi, {auth.user.username}</Text>
                  {auth.user?.image_url ? (
                    <Link href="/profile">
                      <Box>
                        <ImageStyle
                          src={auth.user.image_url}
                          alt={auth.user.username}
                          borderRadius="full"
                          objectFit="cover"
                          boxSize="50px"
                        />
                      </Box>
                    </Link>
                  ) : (
                    <IconButton rounded="full">
                      <BsPersonFill />
                    </IconButton>
                  )}
                  <Button variant="outline" onClick={handleLogout}>
                    {text.logout}
                  </Button>
                </>
              ) : (
                <></>
              )}

              <Box sx={sx.lang} mt={5}>
                {langList.map((val, i) => (
                  <React.Fragment key={i}>
                    <Text
                      as="b"
                      sx={sx.textLang}
                      key={i}
                      cursor={val !== currentLang ? "pointer" : "default"}
                      color={val === currentLang ? "inherit" : "#363636"}
                      onClick={() => changeLang(val)}
                    >
                      {val}
                    </Text>
                    {i !== langList.length - 1 && <Text>|</Text>}
                  </React.Fragment>
                ))}
              </Box>
            </Flex>
          </div>
        </Flex>
      </Container>
    </Box>
  );
}

const sx = {
  header: {
    height: "80px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  nav: {
    display: "flex",
    gap: "10px",
    alignItems: "center",
  },
  lang: {
    display: "flex",
    gap: "10px",
    alignItems: "center",
  },
  textLang: {
    textTransform: "uppercase",
  },
};
