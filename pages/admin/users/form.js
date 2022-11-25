import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import AdminLayout from "layout/AdminLayout";
import generateLang from "lang";
import Table from "components/Table";
import {
  Stack,
  Box,
  Flex,
  Text,
  Button,
  useToast,
  Image,
  InputGroup,
  Center,
  Input,
} from "@chakra-ui/react";
import useAuthStore from "store/authStore";
import { useFormik } from "formik";
import * as yup from "yup";
import img_empty from "/assets/img_empty.png";
import { updateProfile, addAdmin } from "service/auth";

export default function Post(props) {
  const [loading, setLoading] = useState(false);
  const route = useRouter();
  const toast = useToast();
  const formik = useFormik({
    initialValues: {
      fullname: "",
      username: "",
      email: "",
      role_id: 1,
      password: "",
      image_url: "",
    },
    onSubmit: async (value) => {
      setLoading(true);
      // return console.log(value);
      const respon = await addAdmin({ data: value });
      if (!respon?.error) {
        route.push("/admin/users");
        toast({
          position: "bottom-right",
          title: "Profile updated.",
          description: "Success create admin.",
          status: "success",
          duration: 6000,
          isClosable: true,
        });
      } else {
        toast({
          position: "bottom-right",
          title: "Failed to create admin.",
          description: respon?.message ? respon?.message : "-",
          status: "error",
          duration: 6000,
          isClosable: true,
        });
        setLoading(false);
      }
    },
    validationSchema: yup.object({
      // label_name_en: yup.string().required("Name is required"),
      // label_description_en: yup.string().required("Description is required"),
      // label_name_idn: yup.string().required("Name is required"),
      // label_description_idn: yup.string().required("Description is required"),
    }),
    enableReinitialize: true,
  });

  return (
    <>
      <Head>
        <title>add new | GGG</title>
        <meta name="description" content={props.text.home.desc} />
        <link rel="icon" href="/logo64.png" />
      </Head>
      <AdminLayout currentLang={props.currentLang} text={props.text}>
        <Stack spacing={4}>
          <Box>
            <Stack spacing={4} w="full">
              <Flex flexDirection="row" alignItems="center">
                <Text fontSize="4xl" fontWeight="bold">
                  Add new admin
                </Text>
              </Flex>
              <Stack direction="row" spacing={2} w="full">
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
                        cursor="pointer"
                        width="165px"
                        height="165px"
                        alt="img_profile"
                        objectFit="cover"
                        src={
                          formik.values.image_url === ""
                            ? formik.values.image_url
                            : img_empty
                        }
                        // src={userData?.image_url}
                      />
                    </Flex>
                    <Center>
                      {/* <Text fontWeight="700">{userData?.username}</Text> */}
                    </Center>
                  </Stack>
                </Flex>
                <Flex flex="4" w="full">
                  <form
                    onSubmit={formik.handleSubmit}
                    style={{ width: "100%" }}
                  >
                    <Stack spacing={4} w="full">
                      <InputGroup flexDirection="column">
                        <Text fontWeight="700" mb="1">
                          Username
                        </Text>
                        <Input
                          value={formik.values.username}
                          placeholder="Username"
                          background="#D9D9D9"
                          color="black"
                          _placeholder={{ color: "#0000004D" }}
                          name="username"
                          onChange={formik.handleChange}
                        />
                      </InputGroup>
                      <InputGroup flexDirection="column">
                        <Text fontWeight="700" mb="1">
                          Fullname
                        </Text>
                        <Input
                          value={formik.values.fullname}
                          placeholder="Fullname"
                          background="#D9D9D9"
                          color="black"
                          _placeholder={{ color: "#0000004D" }}
                          name="fullname"
                          onChange={formik.handleChange}
                        />
                      </InputGroup>
                      <InputGroup flexDirection="column">
                        <Text fontWeight="700" mb="1">
                          Email
                        </Text>
                        <Input
                          value={formik.values.email}
                          placeholder="Email"
                          background="#D9D9D9"
                          color="black"
                          _placeholder={{ color: "#0000004D" }}
                          name="email"
                          onChange={formik.handleChange}
                        />
                      </InputGroup>
                      <InputGroup flexDirection="column">
                        <Text fontWeight="700" mb="1">
                          password
                        </Text>
                        <Input
                          value={formik.values.password}
                          placeholder="password"
                          type="password"
                          background="#D9D9D9"
                          color="black"
                          _placeholder={{ color: "#0000004D" }}
                          name="password"
                          onChange={formik.handleChange}
                        />
                      </InputGroup>
                      <Box pt="10px">
                        <Center>
                          <Button
                            background="#1C2975"
                            borderRadius="20px"
                            border="1px"
                            borderColor="#FFFFFF"
                            type="submit"
                            isLoading={loading}
                            // onClick={_onConfirmProfile}
                          >
                            Confirm
                          </Button>
                        </Center>
                      </Box>
                    </Stack>
                  </form>
                </Flex>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </AdminLayout>
    </>
  );
}

export async function getServerSideProps({ req }) {
  const { lang, token } = req.cookies;

  let notAllowed = false;

  if (!token) {
    notAllowed = true;
  }
  if (notAllowed) {
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
