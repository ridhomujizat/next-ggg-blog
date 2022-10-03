import { useState } from "react";
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
import { postCategory, uploadImageCategory } from "service/category";
import edjsHTML from "editorjs-html";
import moment from "moment";

const CustomEditor = dynamic(() => import("components/RichEditor"), {
  ssr: false,
});

// const edjsParser = dynamic(() => import("editorjs-html"), {
//   ssr: false,
// });

export default function Form(props) {
  const [loading, setLoading] = useState(false);
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
      stick_to_front: true,
      image_url: "",
      meta_description_idn: "",
      meta_description_en: "",
      date: moment().from("YYYY-MM-DD"),
      category_id: 1,
      array_id_labels: "1;2",
    },
    onSubmit: async (value) => {
      // const edjsParser = edjsHTML();
      // let html = edjsParser.parse(JSON.parse(value.content_en));
      // return console.log(html);
      setLoading(true);
      // HANDLE IMAGE UPLOAD
      const f = new FormData();
      f.append("photo", value.image[0]);

      const responImage = await uploadImageCategory(f);
      delete value.image;
      const respon = await postCategory({
        ...value,
        image_url: responImage.image_url,
      });

      if (!respon.error) {
        route.push("/admin/categorys");
        toast({
          position: "bottom-right",
          title: "Category created.",
          description: "Category has been created.",
          status: "success",
          duration: 6000,
          isClosable: true,
        });
      } else {
        toast({
          position: "bottom-right",
          title: "Failed to create Categorys.",
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

  return (
    <AdminLayout currentLang={props.currentLang} text={props.text}>
      <Text fontSize="2xl" fontWeight="bold" mb="2">
        Add Category
      </Text>
      <form onSubmit={formik.handleSubmit}>
        <Tabs size="md" variant="enclosed" color="white">
          <TabList>
            <Tab _selected={{ bg: "blueDark" }}>EN</Tab>
            <Tab _selected={{ bg: "blueDark" }}>IDN</Tab>
          </TabList>
          <Flex justifyContent="center" p="4" gap="4" alignItems="center">
            <Image
              src={
                formik.values?.image
                  ? URL.createObjectURL(formik.values?.image[0])
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
              value={formik.values.image?.name}
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
                  <Text>Title</Text>
                  <Input
                    placeholder="Name Category"
                    name="title_idn"
                    value={formik.values.title_en}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={
                      formik.touched.title_en && Boolean(formik.errors.title_en)
                    }
                  />
                </Stack>
                <Text>Content</Text>
                <Stack color="black" bgColor="white">
                  <CustomEditor
                    id="en"
                    content={formik.values.content_en}
                    setContent={(e) => {
                      formik.setFieldValue("content_en", e);
                    }}
                  />
                </Stack>
                <Stack spacing={2}>
                  <Text>Meta Description</Text>
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
              </Stack>
            </TabPanel>
            <TabPanel>
              <Stack spacing={4}>
                <Stack spacing={2}>
                  <Text>Title</Text>
                  <Input
                    placeholder="Name Category"
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
                <Box color="black" bgColor="white">
                  <CustomEditor
                    id="idn"
                    content={formik.values.content_idn}
                    setContent={(e) => {
                      formik.setFieldValue("content_idn", e);
                    }}
                  />
                </Box>
                <Stack spacing={2}>
                  <Text>Meta Description</Text>
                  <Textarea
                    placeholder="Meta Description"
                    name="category_description_idn"
                    value={formik.values.category_description_en}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={
                      formik.touched.category_description_en &&
                      Boolean(formik.errors.category_description_en)
                    }
                  />
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
