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
  Image,
  Input,
  InputRightElement,
  InputGroup,
} from "@chakra-ui/react";
import Link from "next/link";
import ModalDeleteItem from "components/Modal/ModalDeleteItem";
import { getBlogs, deleteBlog, deleteImageCategory } from "service/post";
import { MdOutlineEdit, MdDeleteOutline } from "react-icons/md";
import Pagination from "components/Pagination";
import jwtDecode from "jwt-decode";
import { Select } from "chakra-react-select";
import { BsSearch } from "react-icons/bs";

const statusList = [
  { label: "Publish", value: "publish" },
  { label: "Draft", value: "draft" },
];

export default function Post(props) {
  const toast = useToast();
  const [modalDelete, setModalDelete] = useState({ open: false, id: null });
  const [page, setPage] = useState(1);
  const [totalData, setTotalData] = useState(0);
  const [data, setData] = useState([]);
  const [status, setStatus] = useState("publish");
  const [search, setSearch] = useState("");
  useEffect(() => {
    getData();
  }, [page, status]);

  const getData = async () => {
    const respon = await getBlogs({
      type: props.currentLang,
      page,
      limit: 5,
      status,
      search,
    });
    if (!respon?.error) {
      const { blogs, total_data } = respon.data;
      setTotalData(total_data);
      setData(blogs);
    }
  };
  const handleDelete = async () => {
    const respon = await deleteBlog({ id: modalDelete.id });
    if (!respon?.error) {
      toast({
        position: "bottom-right",
        title: "Category deleted.",
        description: "Success delete category.",
        status: "success",
        duration: 6000,
        isClosable: true,
      });
      setModalDelete({ open: false, id: null });
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
        return (
          <Image
            src={val.image_url}
            alt={val.category_name}
            maxW="200px"
            margin="auto"
          />
        );
      },
    },
    {
      id: "title",
      label: "Title",
      align: "left",
    },
    {
      id: "status",
      label: "Status",
      align: "cente",
      format: (val) => {
        let data = {};

        switch (val.status) {
          case "true":
            data = {
              backgroundColor: "green.500",
              label: "Publish",
            };
            break;
          case "draft":
            data = {
              backgroundColor: "yellow.500",
              label: "Draft",
            };
            break;
          default:
            data = {
              backgroundColor: "red.500",
              label: "Non Active",
            };
            break;
        }
        return (
          <Flex justifyContent="center">
            <Box padding="10px 20px" rounded="full" {...data}>
              {data.label}
            </Box>
          </Flex>
        );
      },
    },
    {
      id: "action",
      label: "Action",
      align: "center",
      format: (val) => {
        return (
          <HStack spacing={4} justifyContent="center">
            <Link href={`/admin/post/form/${val.id}`}>
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
          <Box mb="20px">
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
        <Flex mb="20px" wrap="wrap" gap="20px">
          <Stack spacing={2} w="100%" maxWidth="200px">
            <Text>Status</Text>
            <Select
              name="colors"
              options={statusList}
              placeholder="Select labels..."
              closeMenuOnSelect={false}
              value={statusList.filter((val) => val.value === status)[0]}
              onChange={(e) => {
                setStatus(e.value);
                // formik.setFieldValue("array_id_labels", e);
              }}
            />
          </Stack>
          <Stack spacing={2} w="100%" maxWidth="400px">
            <Text>Search</Text>

            <InputGroup
              maxW="600px"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  getData();
                }
              }}
            >
              <InputRightElement>
                <IconButton
                  onClick={() => {
                    getData();
                  }}
                  background="transparent"
                >
                  <BsSearch />
                </IconButton>
              </InputRightElement>
              <Input
                placeholder="Search Blog Post"
                onChange={(e) => {
                  e.preventDefault();
                  setSearch(e.target.value);
                }}
              />
            </InputGroup>
          </Stack>
        </Flex>
        <Table headCell={headCell} data={data} />
        <Pagination
          totalData={totalData}
          current={page}
          limit={5}
          onChengePage={(e) => {
            setPage(e);
          }}
        />
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
