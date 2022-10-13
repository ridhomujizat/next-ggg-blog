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
} from "@chakra-ui/react";
import { useFormik } from "formik";
import * as yup from "yup";
import { postLabel } from "service/labels";
import jwtDecode from "jwt-decode";

export default function Form(props) {
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const route = useRouter();
  const formik = useFormik({
    initialValues: {
      label_name_en: "",
      label_name_idn: "",
      label_description_en: "",
      label_description_idn: "",
    },
    onSubmit: async (value) => {
      setLoading(true);
      const respon = await postLabel(value);
      if (!respon?.error) {
        route.push("/admin/labels");
        toast({
          position: "bottom-right",
          title: "Label created.",
          description: "Label has been created.",
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
      label_name_en: yup.string().required("Name is required"),
      label_description_en: yup.string().required("Description is required"),
      label_name_idn: yup.string().required("Name is required"),
      label_description_idn: yup.string().required("Description is required"),
    }),
  });

  return (
    <AdminLayout currentLang={props.currentLang} text={props.text}>
      <Text fontSize="2xl" fontWeight="bold" mb="2">
        ADD LABELS
      </Text>
      <form onSubmit={formik.handleSubmit}>
        <Tabs size="md" variant="enclosed" color="white">
          <TabList>
            <Tab _selected={{ bg: "blueDark" }}>EN</Tab>
            <Tab _selected={{ bg: "blueDark" }}>IDN</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Stack spacing={4}>
                <Stack spacing={2}>
                  <Text>Name</Text>
                  <Input
                    placeholder="Name label"
                    name="label_name_en"
                    value={formik.values.label_name_en}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={
                      formik.touched.label_name_en &&
                      Boolean(formik.errors.label_name_en)
                    }
                  />
                </Stack>
                <Stack spacing={2}>
                  <Text>Description</Text>
                  <Textarea
                    placeholder="Description Label"
                    name="label_description_en"
                    value={formik.values.label_description_en}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={
                      formik.touched.label_description_en &&
                      Boolean(formik.errors.label_description_en)
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
                    placeholder="Name label"
                    name="label_name_idn"
                    value={formik.values.label_name_idn}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={
                      formik.touched.label_name_idn &&
                      Boolean(formik.errors.label_name_idn)
                    }
                  />
                </Stack>
                <Stack spacing={2}>
                  <Text>Description</Text>
                  <Textarea
                    placeholder="Description Label"
                    name="label_description_idn"
                    value={formik.values.label_description_idn}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={
                      formik.touched.label_description_idn &&
                      Boolean(formik.errors.label_description_idn)
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
