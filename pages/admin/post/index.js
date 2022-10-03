import { useEffect, useState } from "react";
import AdminLayout from "layout/AdminLayout";
import generateLang from "lang";
import Table from "components/Table";
import {
  IconButton,
  Stack,
  Box,
  Flex,
  Text,
  Button,
  HStack,
  useToast,
  Image
} from "@chakra-ui/react";
import Link from "next/link";
import ModalDeleteItem from "components/Modal/ModalDeleteItem";
import { getBlogs, deleteCategory, deleteImageCategory } from "service/post";
import { MdOutlineEdit, MdDeleteOutline } from "react-icons/md";
export default function Post(props) {
  const toast = useToast();
  const [modalDelete, setModalDelete] = useState({ open: false, id: null });
  const [data, setData] = useState([]);
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const respon = await getBlogs({ type: props.currentLang });
    if (!respon.error) {
      setData(respon.data);
    }
  };
  const handleDelete = async () => {
    const respon = await deleteCategory({ id: modalDelete.id });
    if (!respon.error) {
      toast({
        position: "bottom-right",
        title: "Category deleted.",
        description: "Success delete category.",
        status: "success",
        duration: 6000,
        isClosable: true,
      });
      setModalDelete({open: false, id: null})
      getData();
    } else {
      toast({
        position: "bottom-right",
        title: "Failed to delete Category.",
        description: respon?.message ? respon?.message : "-",
        status: "error",
        duration: 6000,
        isClosable: true,
      });
      setLoading(false);
    }
  };

  const headCell = [
    {
      id: "img",
      label: "Image",
      align: "center",
      format: (val) => {
        return <Image src={val.image_url} alt={val.category_name} maxW="200px" margin="auto" />
      },
    },
    {
      id: "category_name",
      label: "Title",
      align: "left",
    },
    // {
    //   id: "label_description",
    //   label: "Description",
    //   align: "left",
    // },
    {
      id: "action",
      label: "Action",
      align: "center",
      format: (val) => {
        return (
          <HStack spacing={4} justifyContent="center">
            <Link href={`/admin/categorys/form/${val.id}`}>
              <IconButton
                aria-label="Search database"
                icon={<MdOutlineEdit />}
                colorScheme="linkedin"
              />
            </Link>

            <IconButton
              aria-label="Search database"
              icon={<MdDeleteOutline />}
              colorScheme="red"
              onClick={() => setModalDelete({ open: true, id: val.id })}
            />
          </HStack>
        );
      },
    },
  ];

  return (
    <AdminLayout currentLang={props.currentLang} text={props.text}>
      <Stack spacing={4}>
        <Flex
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
          flexWrap="wrap"
        >
          <Box>
            <Flex flexDirection="row" alignItems="center">
              <Text fontSize="4xl" fontWeight="bold" mr="10px">
                Blog Post
              </Text>
              <Link href="/admin/post/form">
                <Button
                  borderWidth={1}
                  borderColor="#FFFFFF80"
                  background="transparent"
                  h="37px"
                  w="154px"
                >
                  Add New
                </Button>
              </Link>
            </Flex>
          </Box>
        </Flex>
        <Table headCell={headCell} data={data} />
      </Stack>
      <ModalDeleteItem
        open={modalDelete.open}
        item="label"
        onClose={() => setModalDelete(false)}
        onDelete={handleDelete}
      />
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
