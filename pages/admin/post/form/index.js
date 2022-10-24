import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import AdminLayout from "layout/AdminLayout";
import generateLang from "lang";
import {
  Stack,
  Input,
  Textarea,
  Text,
  Flex,
  Button,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  useToast,
  Image,
  Box,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import * as yup from "yup";
import { postBlog, uploadImageBlog } from "service/post";
import { getLabels } from "service/labels";
import { getCategorys } from "service/category";
import { Select } from "chakra-react-select";
import moment from "moment";
import useAuthStore from "store/authStore";
import jwtDecode from "jwt-decode";

const CustomEditor = dynamic(() => import("components/RichEditor"), {
  ssr: false,
});

// const edjsParser = dynamic(() => import("editorjs-html"), {
//   ssr: false,
// });

export default function Form(props) {
  const stateAuth = useAuthStore((state) => state);
  const [labels, setLabels] = useState([]);
  const [categorys, setCategorys] = useState([]);
  const [type, setType] = useState("en");
  const [auth, setAuth] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setAuth(stateAuth.user);
    getAdditionalData();
  }, []);

  const getAdditionalData = async () => {
    const responseCat = await getCategorys({
      type: props.currentLang,
    });
    const responseLabel = await getLabels({
      type: props.currentLang,
    });
    if (responseCat.data.length > 0) {
      setCategorys(
        responseCat.data?.map((val) => ({
          value: val.id,
          label: val.category_name,
        }))
      );
    }
    if (responseLabel.data.length > 0) {
      setLabels(
        responseLabel.data?.map((val) => ({
          value: val.id,
          label: val.label_name,
        }))
      );
    }
  };
  const toast = useToast();
  const route = useRouter();
  const formik = useFormik({
    initialValues: {
      title_idn: "",
      title_en: "",
      content_idn: "",
      content_en: "",
      slug_idn: "",
      slug_en: "",
      author: "admin",
      stick_to_front: false,
      image_url: "",
      image: null,
      meta_description_idn: "",
      meta_description_en: "",
      date: Date.now(),
      category_id: [],
      array_id_labels: [],
    },
    onSubmit: async (value) => {
      setLoading(true);
      // HANDLE IMAGE UPLOAD
      // const f = new FormData();
      // f.append("photo", value.image[0]);

      // const responImage = await uploadImageBlog(f);
      // IF IMAGE FAILED APLOAD;
      // if (!responImage?.error) {
      //   value.image_url = responImage.image_url;
      // } else {
      //   return toast({
      //     position: "bottom-right",
      //     title: "Failed to upload image.",
      //     description: respon?.message ? respon?.message : "-",
      //     status: "error",
      //     duration: 6000,
      //     isClosable: true,
      //   });
      // }

      //slug
      value.slug_en = value.title_en.split(" ").join("-");
      value.slug_idn = value.title_en.split(" ").join("-");

      const valueLabels = value.array_id_labels
        .map((val) => val.value)
        .join(",");
      const valueCategory = value.category_id[0].value;

      const { image, ...payload } = value;

      const respon = await postBlog({
        ...payload,
        category_id: valueCategory,
        array_id_labels: valueLabels,
        date: moment().format("YYYY-MM-DD HH:mm:ss  "),
      });

      if (!respon?.error) {
        delete value.image;
        route.push("/admin/post");
        toast({
          position: "bottom-right",
          title: "Blog created.",
          description: "Blog has been created.",
          status: "success",
          duration: 6000,
          isClosable: true,
        });
      } else {
        toast({
          position: "bottom-right",
          title: "Failed to create blog.",
          description: respon?.message ? respon?.message : "-",
          status: "error",
          duration: 6000,
          isClosable: true,
        });
        setLoading(false);
      }
    },
    validationSchema: yup.object({
      //   image: yup.mixed().required("Name is required"),
      //   category_name_en: yup.string().required("Name is required"),
      //   category_name_idn: yup.string().required("Name is required"),
      //   category_description_idn: yup
      //     .string()
      //     .required("Description is required"),
      //   category_description_en: yup.string().required("Description is required"),
    }),
  });

  const postImage = async (val) => {
    const f = new FormData();
    f.append("photo", val[0]);
    const responImage = await uploadImageBlog(f);

    if (!responImage?.error) {
      formik.setFieldValue("image_url", responImage.image_url);
    } else {
      return toast({
        position: "bottom-right",
        title: "Failed to upload image.",
        description: respon?.message ? respon?.message : "-",
        status: "error",
        duration: 6000,
        isClosable: true,
      });
    }
  };

  return (
    <AdminLayout currentLang={props.currentLang} text={props.text}>
      <Text fontSize="2xl" fontWeight="bold" mb="2">
        Add Category
      </Text>
      <form onSubmit={formik.handleSubmit}>
        <Tabs size="md" variant="enclosed" color="white">
          <TabList>
            <Tab _selected={{ bg: "blueDark" }} onClick={() => setType("en")}>
              EN
            </Tab>
            <Tab _selected={{ bg: "blueDark" }} onClick={() => setType("idn")}>
              IDN
            </Tab>
          </TabList>
          {/* IMAGE INPUT  */}
          <Flex justifyContent="center" p="4" gap="4" alignItems="center">
            <Image
              src={
                formik.values?.image_url
                  ? formik.values?.image_url
                  : "/image/img_empty.png"
              }
              maxH="200px"
              alt="image-category"
              maxW="50%"
            />
            <Input
              accept="image/* "
              type="file"
              name="image"
              // value={formik.values.image?.name}
              onChange={(e) => {
                postImage(e.target.files)
                // formik.setFieldValue("image", e.target.files);
              }}
              onBlur={formik.handleBlur}
              isInvalid={formik.touched.image && Boolean(formik.errors.image)}
            />
          </Flex>
          <Flex p="4">
            <Stack spacing={2} w="100%">
              <Text>Labels</Text>
              <Select
                isMulti
                name="colors"
                options={labels}
                placeholder="Select labels..."
                closeMenuOnSelect={false}
                value={formik.values.array_id_labels}
                onChange={(e) => {
                  formik.setFieldValue("array_id_labels", e);
                }}
              />
            </Stack>
          </Flex>
          <Flex p="4">
            <Stack spacing={2} w="100%">
              <Text>Category</Text>
              <Select
                name="colors"
                options={categorys}
                placeholder="Select category..."
                closeMenuOnSelect={false}
                value={formik.values.category_id}
                onChange={(e) => {
                  formik.setFieldValue("category_id", [e]);
                }}
              />
            </Stack>
          </Flex>
          <TabPanels>
            <TabPanel>
              <Stack spacing={4}>
                <Stack spacing={2}>
                  <Text>
                    Title <TextTransform string={type} />
                  </Text>
                  <Input
                    placeholder="Title Content"
                    name="title_en"
                    value={formik.values.title_en}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={
                      formik.touched.title_en && Boolean(formik.errors.title_en)
                    }
                  />
                </Stack>
                <Stack spacing={2}>
                  <Text>
                    Meta Description <TextTransform string={type} />
                  </Text>
                  <Textarea
                    placeholder="Meta Description"
                    name="meta_description_en"
                    value={formik.values.meta_description_en}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={
                      formik.touched.meta_description_en &&
                      Boolean(formik.errors.meta_description_en)
                    }
                  />
                </Stack>
                <Stack spacing={2}>
                  <Text>
                    Content <TextTransform string={type} />
                  </Text>
                  <Stack color="black" bgColor="white">
                    <CustomEditor
                      id="en"
                      content={formik.values.content_en}
                      setContent={(e) => {
                        formik.setFieldValue("content_en", e);
                      }}
                    />
                  </Stack>
                </Stack>
              </Stack>
            </TabPanel>
            <TabPanel>
              <Stack spacing={4}>
                <Stack spacing={2}>
                  <Text>
                    Title
                    <TextTransform string={type} />
                  </Text>
                  <Input
                    placeholder="Title Content"
                    name="title_idn"
                    value={formik.values.title_idn}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={
                      formik.touched.title_idn &&
                      Boolean(formik.errors.title_idn)
                    }
                  />
                </Stack>
                <Stack spacing={2}>
                  <Text>
                    Meta Description
                    <TextTransform string={type} />
                  </Text>
                  <Textarea
                    placeholder="Meta Description"
                    name="meta_description_idn"
                    value={formik.values.meta_description_idn}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={
                      formik.touched.meta_description_idn &&
                      Boolean(formik.errors.meta_description_idn)
                    }
                  />
                </Stack>
                <Stack spacing={2}>
                  <Text>
                    Content
                    <TextTransform string={type} />
                  </Text>
                  <Stack color="black" bgColor="white">
                    <CustomEditor
                      id="idn"
                      content={formik.values.content_idn}
                      setContent={(e) => {
                        formik.setFieldValue("content_idn", e);
                      }}
                    />
                  </Stack>
                </Stack>
              </Stack>
            </TabPanel>
          </TabPanels>
        </Tabs>

        <Flex justifyContent="flex-end" p="4">
          <Button type="submit" disabled={!formik.isValid}>
            Save
          </Button>
        </Flex>
      </form>
    </AdminLayout>
  );
}

const TextTransform = ({ string }) => {
  return (
    <span style={{ textTransform: "uppercase", color: "#cecece" }}>
      ({string})
    </span>
  );
};

export async function getServerSideProps({ req }) {
  const { lang, token } = req.cookies;

  let notAllowed = false;

  if (!token) {
    notAllowed = true;
  }
  if (token) {
    const { role } = jwtDecode(token);
    if (role?.role_name === "User") {
      notAllowed = true;
    }
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
