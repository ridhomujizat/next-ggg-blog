import { useState } from "react";
import { useRouter } from "next/router";
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
} from "@chakra-ui/react";
import { useFormik } from "formik";
import * as yup from "yup";
import { postCategory, uploadImageCategory } from "service/category";

export default function Form(props) {
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const route = useRouter();
  const formik = useFormik({
    initialValues: {
      category_name_en: "",
      category_name_idn: "",
      category_description_en: "",
      category_description_idn: "",
      image: null,
    },
    onSubmit: async (value) => {
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
      image: yup.mixed().required("Name is required"),
      category_name_en: yup.string().required("Name is required"),
      category_name_idn: yup.string().required("Name is required"),
      category_description_idn: yup
        .string()
        .required("Description is required"),
      category_description_en: yup.string().required("Description is required"),
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
                  <Text>Name</Text>
                  <Input
                    placeholder="Name Category"
                    name="category_name_en"
                    value={formik.values.category_name_en}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={
                      formik.touched.category_name_en &&
                      Boolean(formik.errors.category_name_en)
                    }
                  />
                </Stack>
                <Stack spacing={2}>
                  <Text>Description</Text>
                  <Textarea
                    placeholder="Description Category"
                    name="category_description_en"
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
            <TabPanel>
              <Stack spacing={4}>
                <Stack spacing={2}>
                  <Text>Name</Text>
                  <Input
                    placeholder="Name Category"
                    name="category_name_idn"
                    value={formik.values.category_name_idn}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={
                      formik.touched.category_name_idn &&
                      Boolean(formik.errors.category_name_idn)
                    }
                  />
                </Stack>
                <Stack spacing={2}>
                  <Text>Description</Text>
                  <Textarea
                    placeholder="Description Category"
                    name="category_description_idn"
                    value={formik.values.category_description_idn}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={
                      formik.touched.category_description_idn &&
                      Boolean(formik.errors.category_description_idn)
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
