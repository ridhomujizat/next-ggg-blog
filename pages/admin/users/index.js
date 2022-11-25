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
  useToast
} from "@chakra-ui/react";
import Link from "next/link";
import ModalDeleteItem from "components/Modal/ModalDeleteItem";
import { getAllUser, deleteUser } from "service/auth";
import { MdOutlineEdit, MdDeleteOutline } from "react-icons/md";
import jwtDecode from "jwt-decode";

export default function Post(props) {
  const toast = useToast();
  const [modalDelete, setModalDelete] = useState({ open: false, id: null });
  const [data, setData] = useState([]);
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const respon = await getAllUser();
    if (!respon?.error) {
      setData(respon.data);
    }
  };
  const handleDelete = async () => {
    const respon = await deleteUser({ id: modalDelete.id });
    if (!respon?.error) {
      toast({
        position: "bottom-right",
        title: "Label deleted.",
        description: "Success delete user.",
        status: "success",
        duration: 6000,
        isClosable: true,
      });
      getData()
      setModalDelete({open: false, id: null})
    } else {
      toast({
        position: "bottom-right",
        title: "Failed to delete User.",
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
      id: "fullname",
      label: "Fullname",
      align: "left",
    },
    {
      id: "username",
      label: "Username",
      align: "left",
    },
    {
      id: "email",
      label: "Email",
      align: "left",
    },
    {
      id: "action",
      label: "Action",
      align: "center",
      format: (val) => {
        return (
          <HStack spacing={4} justifyContent="center">
            {/* <Link href={`/admin/labels/form/${val.id}`}>
              <IconButton
                aria-label="Search database"
                icon={<MdOutlineEdit />}
                colorScheme="linkedin"
              />
            </Link> */}

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
                Users Management
              </Text>
              <Link href="/admin/users/form">
                <Button
                  borderWidth={1}
                  borderColor="#FFFFFF80"
                  background="transparent"
                  h="37px"
                  w="154px"
                >
                  Add New Admin
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
