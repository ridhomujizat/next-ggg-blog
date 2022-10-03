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
} from "@chakra-ui/react";
import { useFormik } from "formik";
import * as yup from "yup";
import { updateLabels, getDetailLabel } from "service/labels";
const value = {
  label_name_en: "",
  label_name_idn: "",
  label_description_en: "",
  label_description_idn: "",
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
      const respon = await updateLabels({id, data: value});
      if (!respon.error) {
        route.push("/admin/labels");
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
      label_name_en: yup.string().required("Name is required"),
      label_description_en: yup.string().required("Description is required"),
      label_name_idn: yup.string().required("Name is required"),
      label_description_idn: yup.string().required("Description is required"),
    }),
    enableReinitialize: true,
  });

  const getLabel = async () => {
    const responEN = await getDetailLabel({ id, type: "en" });
    const responIDN = await getDetailLabel({ id, type: "idn" });
    setIntialValue({
      label_name_en: responEN.data.label_name,
      label_name_idn: responIDN.data.label_name,
      label_description_en: responEN.data.label_description,
      label_description_idn: responIDN.data.label_description,
    });
  };

  useEffect(() => {
    getLabel();
  }, []);

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
  if (!token) {
    return {
      redirect: {
        destination: '/login',
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
