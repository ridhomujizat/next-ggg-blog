import Footer from "components/section/Footer";
import Head from "next/head";
import {
  Container,
  Box,
  Text,
  Flex,
  Input,
  Button,
  Stack,
  InputGroup,
  Center,
} from "@chakra-ui/react";
import Navbar from "components/section/Navbar";
import Sidebar from "components/section/Sidebar";
import { useEffect, useState } from "react";
import Image from "next/image";
import img_empty from "/assets/img_empty.png";
// import { useSession } from "next-auth/react";
import Router from "next/router";
import generateLang from "lang";
import useAuthStore from "store/authStore";

export default function User() {
  const userData = useAuthStore.getState().user;

  const [inputData, setInputData] = useState({
    username: userData?.username,
    password: "",
    updatePassword: "",
  });

  const _onConfirmProfile = () => {
    //confirm
  };

  return (
    <Box background={"#0C0E17"}>
      <Head>
        <title>Blog | GGG</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <Sidebar>
        <Container maxW="container.xl" as="main">
          <Stack spacing={4}>
            <Flex flexDirection="row" alignItems="center">
              <Text fontSize="4xl" fontWeight="bold">
                Profile
              </Text>
            </Flex>
            <Stack direction="row" spacing={2}>
              <Flex flex="1">
                <Stack spacing={4}>
                  <Flex
                    w="165px"
                    h="165px"
                    borderRadius="165px"
                    background="#D9D9D9"
                    justifyContent="center"
                    alignItems="center"
                    overflow="hidden"
                  >
                    <Image
                      // width="78px"
                      width="165px"
                      height="165px"
                      alt="img_profile"
                      objectFit="cover"
                      src={img_empty}
                      // src={userData?.image_url}
                    />
                  </Flex>
                  <Center>
                    <Text fontWeight="700">{userData?.username}</Text>
                  </Center>
                </Stack>
              </Flex>
              <Flex flex="4">
                <Stack spacing={4}>
                  <InputGroup flexDirection="column">
                    <Text fontWeight="700" mb="1">
                      Username
                    </Text>
                    <Input
                      value={inputData.username}
                      placeholder="Username"
                      background="#D9D9D9"
                      color="black"
                      _placeholder={{ color: "#0000004D" }}
                      onChange={(e) =>
                        setInputData({
                          ...inputData,
                          username: e.currentTarget.value,
                        })
                      }
                    />
                  </InputGroup>
                  <InputGroup flexDirection="column">
                    <Text fontWeight="700" mb="1">
                      Password
                    </Text>
                    <Input
                      value={inputData.password}
                      placeholder="Password"
                      type="password"
                      background="#D9D9D9"
                      color="black"
                      _placeholder={{ color: "#0000004D" }}
                      onChange={(e) =>
                        setInputData({
                          ...inputData,
                          password: e.currentTarget.value,
                        })
                      }
                    />
                  </InputGroup>
                  <InputGroup flexDirection="column">
                    <Text fontWeight="700" mb="1">
                      Update Password
                    </Text>
                    <Input
                      value={inputData.updatePassword}
                      placeholder="Update Password"
                      type="password"
                      background="#D9D9D9"
                      color="black"
                      _placeholder={{ color: "#0000004D" }}
                      onChange={(e) =>
                        setInputData({
                          ...inputData,
                          updatePassword: e.currentTarget.value,
                        })
                      }
                    />
                  </InputGroup>
                  <Box pt="10px">
                    <Center>
                      <Button
                        background="#1C2975"
                        borderRadius="20px"
                        border="1px"
                        borderColor="#FFFFFF"
                        onClick={_onConfirmProfile}
                      >
                        Confirm
                      </Button>
                    </Center>
                  </Box>
                </Stack>
              </Flex>
            </Stack>
          </Stack>
        </Container>
      </Sidebar>
    </Box>
  );
}

export async function getServerSideProps({ req }) {
  const { lang, token } = req.cookies;
  if (!token) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  const initialLang = generateLang(lang);

  return {
    props: {
      ...initialLang,
    },
  };
}