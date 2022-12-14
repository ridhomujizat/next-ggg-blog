import { useState, useEffect } from "react";
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
import { updateCategory, getDetailCategory, uploadImageCategory } from "service/category";
import jwtDecode from "jwt-decode";

const value = {
  category_name_en: "",
  category_name_idn: "",
  category_description_en: "",
  category_description_idn: "",
  image_url: null,
};
export default function Form(props) {
  const [initialValue, setIntialValue] = useState(value);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const route = useRouter();
  const { id } = route.query;
  const formik = useFormik({
    initialValues: initialValue,
    onSubmit: async (value) => {
      setLoading(true);
      const respon = await updateCategory({ id, data: value });
      if (!respon?.error) {
        route.push("/admin/categorys");
        toast({
          position: "bottom-right",
          title: "Label updated.",
          description: "Success update label.",
          status: "success",
          duration: 6000,
          isClosable: true,
        });
      } else {
        toast({
          position: "bottom-right",
          title: "Failed to create Labels.",
          description: respon?.message ? respon?.message : "-",
          status: "error",
          duration: 6000,
          isClosable: true,
        });
        setLoading(false);
      }
    },
    validationSchema: yup.object({
      category_name_en: yup.string().required("Name is required"),
      category_name_idn: yup.string().required("Name is required"),
      category_description_idn: yup
        .string()
        .required("Description is required"),
      category_description_en: yup.string().required("Description is required"),
    }),
    enableReinitialize: true,
  });

  const getLabel = async () => {
    const responEN = await getDetailCategory({ id, type: "en" });
    const responIDN = await getDetailCategory({ id, type: "idn" });
    setIntialValue({
      image_url: responEN.data.image_url,
      category_name_en: responEN.data.category_name,
      category_name_idn: responIDN.data.category_name,
      category_description_en: responEN.data.category_description,
      category_description_idn: responIDN.data.category_description,
    });
  };

  useEffect(() => {
    getLabel();
  }, []);

  const postImage = async (val) => {
    const f = new FormData();
    f.append("photo", val[0]);
    const responImage = await uploadImageCategory(f);
    formik.setFieldValue("image_url", responImage.image_url);
  };
  return (
    <AdminLayout currentLang={props.currentLang} text={props.text}>
      <Text fontSize="2xl" fontWeight="bold" mb="2">
        Update Label
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
              onChange={(e) => {
                postImage(e.target.files);
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
