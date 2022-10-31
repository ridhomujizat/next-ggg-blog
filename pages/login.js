import Head from "next/head";
import { useRouter } from "next/router";
import {
  Box,
  Button,
  Center,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  Spacer,
  Stack,
  Text,
  useToast,
  InputRightElement,
  IconButton,
} from "@chakra-ui/react";
import Image from "next/image";
import React, { useState } from "react";
import logo from "assets/logo-ggg-black.png";
import Link from "next/link";
import { serviceLogin } from "service/auth";
import useAuthStore from "store/authStore";
import Cookies from "js-cookie";
import { BsEye, BsEyeSlash } from "react-icons/bs";

function Login() {
  const toast = useToast();
  const router = useRouter();
  const storeAuth = useAuthStore((state) => state);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);

  const handleSubmit = async () => {
    await setLoading(true);
    const respon = await serviceLogin({ email, password });
    if (respon?.error) {
      await setLoading(false);
      return toast({
        position: "bottom-right",
        title: "Failed to Login.",
        description: respon?.message ? respon?.message : "-",
        status: "error",
        duration: 6000,
        isClosable: true,
      });
    }
    Cookies.set("token", respon.data.token, { expires: 2 });
    await storeAuth.setLogin(respon.data);
    router.push("/admin/post");
  };

  return (
    <>
      <Head>
        <title>Login | GGG</title>
        <meta name="description" content="login GGG blog" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box background={"#0C0E17"}>
        <Flex
          flexDirection="column"
          width="100wh"
          minH="100vh"
          justifyContent="center"
          alignItems="center"
        >
          <Stack
            flexDir="column"
            mb="2"
            justifyContent="center"
            alignItems="center"
          >
            <Image src={logo} alt="logo.png" width="200px" height="175px" />
            <Box
              background="rgba(196, 196, 196, 0.46)"
              justifyContent={"center"}
              flexDirection="column"
              alignItems="center"
              margin="auto"
              width={["90%", "100%"]}
              borderRadius="5px"
              p={8}
            >
              <Center>
                <form>
                  <Stack spacing={4}>
                    <FormControl isRequired>
                      <FormLabel htmlFor="email" fontWeight="600">
                        Username or Email Address
                      </FormLabel>
                      <InputGroup>
                        <Input
                          type="email"
                          placeholder="Username"
                          id="email"
                          background="#D9D9D9"
                          _placeholder={{ color: "rgba(0, 0, 0, 0.3)" }}
                          color="black"
                          onChange={(event) =>
                            setEmail(event.currentTarget.value)
                          }
                        />
                      </InputGroup>
                    </FormControl>
                    <FormControl isRequired>
                      <FormLabel htmlFor="password" fontWeight="600">
                        Password
                      </FormLabel>
                      <InputGroup>
                        <Input
                          type={showPass ? "text" : "password"}
                          placeholder="password"
                          id="password"
                          background="#D9D9D9"
                          _placeholder={{ color: "rgba(0, 0, 0, 0.3)" }}
                          color="black"
                          onChange={(event) =>
                            setPassword(event.currentTarget.value)
                          }
                        />
                        <InputRightElement>
                          <IconButton
                            aria-label="Search database"
                            onClick={() => setShowPass(!showPass)}
                            icon={
                              showPass ? (
                                <BsEyeSlash color="rgba(0, 0, 0, 0.5)" />
                              ) : (
                                <BsEye color="rgba(0, 0, 0, 0.5)" />
                              )
                            }
                          />
                        </InputRightElement>
                      </InputGroup>
                    </FormControl>
                    {/* <Text color="red">{error}</Text> */}
                    <Flex flexDirection="row" justifyContent="space-between">
                      <Checkbox checked fontWeight="600">
                        Remember Me
                      </Checkbox>
                      <Button
                        background="#1C2975"
                        borderColor="white"
                        border="1px"
                        borderRadius={20}
                        width={100}
                        onClick={handleSubmit}
                        isLoading={loading}
                      >
                        Login
                      </Button>
                    </Flex>
                    <Flex flexDirection="row" justifyContent="space-between">
                      <Link href="/register">
                        <a>
                          <Text fontWeight={600} fontSize="sm" color="#1C2975">
                            Register here
                          </Text>
                        </a>
                      </Link>
                      <Link href="/reset-password">
                        <a>
                          <Text fontWeight={600} fontSize="sm" color="white">
                            Lost your password?
                          </Text>
                        </a>
                      </Link>
                    </Flex>
                  </Stack>
                </form>
              </Center>
            </Box>
          </Stack>
          <Box display={["block", "none"]}>{/* <Footer /> */}</Box>
        </Flex>
      </Box>
    </>
  );
}
export async function getServerSideProps({ req }) {
  const { lang, token } = req.cookies;
  if (token) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}
export default Login;
