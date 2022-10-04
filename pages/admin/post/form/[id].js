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
import { getDetailBlog, updateBlog, uploadImageBlog } from "service/post";
import edjsHTML from "editorjs-html";
import moment from "moment";
import useAuthStore from "store/authStore";
const CustomEditor = dynamic(() => import("components/RichEditor"), {
  ssr: false,
});

// const edjsParser = dynamic(() => import("editorjs-html"), {
//   ssr: false,
// });

const value = {
  title_idn: "",
  title_en: "",
  content_idn: null,
  content_en: null,
  slug_idn: "",
  slug_en: "",
  author: "admin",
  stick_to_front: false,
  image_url: "",
  meta_description_idn: "",
  meta_description_en: "",
  date: Date.now(),
  category_id: 1,
  array_id_labels: "1;2",
};

export default function Form(props) {
  const stateAuth = useAuthStore((state) => state);
  const [type, setType] = useState("en");
  const [auth, setAuth] = useState(null);
  const [loading, setLoading] = useState(false);
  const [initialValue, setIntialValue] = useState(value);
  const toast = useToast();
  const route = useRouter();
  const { id } = route.query;
  const formik = useFormik({
    initialValues: initialValue,
    onSubmit: async (value) => {
      setLoading(true);

      if (value.image) {
        const f = new FormData();
        f.append("photo", value.image[0]);

        const responImage = await uploadImageCategory(f);
        delete value.image;
        value.image_url = responImage.image_url;
      }
      // return console.log(value);
      // const edjsParser = edjsHTML();
      // let html = edjsParser.parse(JSON.parse(value.content_en));
      // return console.log(html);
      // HANDLE IMAGE UPLOAD
      // delete value.image;

      value.slug_en = value.title_en.split(" ").join("-");
      value.slug_idn = value.title_en.split(" ").join("-");

      // return console.log(value)
      const respon = await updateBlog({
        id,
        data: {
          ...value,
          // date: moment().format("YYYY-MM-DD HH:mm:ss  "),
        },
      });

      if (!respon.error) {
        delete value.image;
        route.push("/admin/post");
        toast({
          position: "bottom-right",
          title: "Blog updated.",
          description: "Blog has been updated.",
          status: "success",
          duration: 6000,
          isClosable: true,
        });
      } else {
        toast({
          position: "bottom-right",
          title: "Failed to update blog.",
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
    enableReinitialize: true,
  });

  const getCategory = async () => {
    const responEN = await getDetailBlog({ id, type: "en" });
    const responIDN = await getDetailBlog({ id, type: "idn" });
    setIntialValue({
      ...responEN.data,
      array_id_labels: responEN.data.array_id_labels
        .map((val) => val.id)
        .join(","),
      CategoryBlog: responEN.data.CategoryBlog.id,

      // title_idn: responIDN.data.title,
      // title_en: responEN.data.title,
      // content_idn: responIDN.data.content,
      // content_en: responEN.data.content,
      // slug_idn: responIDN.data.slug,
      // slug_en: responEN.data.slug,
      // meta_description_idn: responIDN.data.meta_description,
      // meta_description_en: responEN.data.meta_description,
    });
    setTimeout(() => {
      formik.setFieldValue("content_idn", responIDN.data.content_idn);
      formik.setFieldValue("content_en", responIDN.data.content_en);
    }, 6000);
  };

  useEffect(() => {
    getCategory();
  }, []);

  useEffect(() => {
    setAuth(stateAuth.user);
  }, []);

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
                formik.values?.image
                  ? URL.createObjectURL(formik.values?.image[0])
                  : formik.values?.image_url
              }
              maxH="200px"
              alt="image-category"
              maxW="50%"
            />
            <Input
              accept="image/* "
              type="file"
              name="image"
              value={formik.values?.image?.name}
              onChange={(e) => {
                formik.setFieldValue("image", e.target.files);
              }}
              onBlur={formik.handleBlur}
              isInvalid={formik.touched.image && Boolean(formik.errors.image)}
            />
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
                    {formik.values.content_en && (
                      <CustomEditor
                        id="en"
                        content={formik.values.content_en}
                        setContent={(e) => {
                          formik.setFieldValue("content_en", e);
                        }}
                      />
                    )}
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
                    {formik.values.content_idn && (
                      <CustomEditor
                        id="idn"
                        content={formik.values.content_idn}
                        setContent={(e) => {
                          formik.setFieldValue("content_idn", e);
                        }}
                      />
                    )}
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