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
} from "@chakra-ui/react";
import Image from "next/image";
import React, { useState } from "react";
import logo from "assets/logo-ggg-black.png";
import Link from "next/link";
import Footer from "components/section/Footer";
import Router from "next/router";
import { serviceRegister } from "service/auth";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await serviceRegister({
      fullname: "username",
      username: username,
      email: email,
      password: password,
      image_url: "",
    });
    console.log("responsee", response);
    if (response.statusCode === 201) {
      Router.replace("/login");
    }
    // alert(`Email: ${email} & Password: ${password}`);
  };

  return (
    <Box background={"#0C0E17"} height="100%">
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
                <Stack>
                  <FormControl isRequired>
                    <FormLabel htmlFor="username" fontWeight="600">
                      Username
                    </FormLabel>
                    <InputGroup>
                      <Input
                        type="text"
                        placeholder="Username"
                        id="email"
                        background="#D9D9D9"
                        _placeholder={{ color: "rgba(0, 0, 0, 0.3)" }}
                        color="black"
                        onChange={(event) =>
                          setUsername(event.currentTarget.value)
                        }
                      />
                    </InputGroup>
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel htmlFor="email" fontWeight="600">
                      Email
                    </FormLabel>
                    <InputGroup>
                      <Input
                        type="email"
                        placeholder="Email"
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
                        type="password"
                        placeholder="xxxxxxxxxx"
                        id="password"
                        background="#D9D9D9"
                        _placeholder={{ color: "rgba(0, 0, 0, 0.3)" }}
                        color="black"
                        onChange={(event) =>
                          setPassword(event.currentTarget.value)
                        }
                      />
                    </InputGroup>
                  </FormControl>
                  <Spacer height="20" />
                  <Flex flexDirection="row" justifyContent="space-between">
                    <Box>
                      <Text>Already have an account?{"\n"}</Text>
                      {/* <Link href="/auth/signin">
                        <a> */}
                      <Text
                        fontWeight={600}
                        fontSize="sm"
                        color="#1C2975"
                        onClick={() => Router.replace("/login")}
                      >
                        Login here
                      </Text>
                      {/* </a> */}
                      {/* </Link> */}
                    </Box>
                    <Button
                      background="#1C2975"
                      borderColor="white"
                      border="1px"
                      borderRadius={20}
                      width={100}
                      onClick={handleSubmit}
                    >
                      Register
                    </Button>
                  </Flex>
                  <Spacer height={10} />
                </Stack>
              </form>
            </Center>
          </Box>
        </Stack>
        <Box display={["block", "none"]}>
          <Footer />
        </Box>
      </Flex>
    </Box>
  );
}

export default Register;