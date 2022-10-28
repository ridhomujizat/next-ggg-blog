import React from "react";
import Head from "next/head";
import NextLink from "next/link";
import { useRouter } from "next/router";
import generateLang from "lang";
import PageLayouts from "layout/PagesLayout";
import Thumbnail from "components/Thumbnail";
import Cateogries from "components/section/Cateogries";
import {
  Container,
  Box,
  SimpleGrid,
  Text,
  InputGroup,
  Input,
  InputRightElement,
  Spacer,
  Stack,
  GridItem,
  IconButton,
  Image,
  InputLeftElement,
} from "@chakra-ui/react";
import { BsSearch, BsX } from "react-icons/bs";
import { getBlogs } from "service/post";
import { getCategorys } from "service/category";
import { getLabels } from "service/labels";
import moment from "moment";
import Pagination from "components/Pagination";

export default function Home(props) {
  const { params, BlogList, totalData } = props;
  const [valueSearch, setValueSearch] = React.useState("");
  const router = useRouter();

  const stickyPost = () => {
    let data = [];
    if (params.page == 1) {
      data = props.BlogList?.slice(0, 1);
    }

    return data;
  };

  const firstColum = () => {
    let data = [];
    if (params.page == 1) {
      data = props.BlogList?.slice(1, 5);
    }
    return data;
  };

  const listColumn = () => {
    let data = [];
    if (params.page == 1) {
      data = props.BlogList?.slice(6, data.length + 1);
    } else {
      data = props.BlogList;
    }
    return data;
  };

  const handleParams = (value) => {
    router.push({
      query: {
        ...props.params,
        ...value,
      },
    });
  };

  const removeParams = (value) => {
    const newParams = props.params;
    delete newParams[value];
    router.push({
      query: {
        ...newParams,
      },
    });
  };

  const isFilterbyCategoryLabels = params.category || params.label;

  return (
    <div>
      <Head>
        <title>Blog | GGG</title>
        <meta name="description" content={props.text.home.desc} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageLayouts currentLang={props.currentLang} text={props.text}>
        <Stack>
          <Stack spacing={4}>
            {/* TITILE PAGE  */}
            <SimpleGrid
              columns={isFilterbyCategoryLabels ? [1, null, 1] : [1, null, 2]}
              spacing={[5, null, 10]}
              alignItems="center"
            >
              <Box>
                <Text as="h1" fontSize="5xl">
                  <b>{props.text.home.title}</b>
                </Text>
                <Text as="h1" fontSize="sm">
                  {props.text.home.desc}
                </Text>
              </Box>
              <Box>
                {isFilterbyCategoryLabels && (
                  <Box display="flex" gap="20px">
                    {params.category && (
                      <Box display="flex" mb="10px" gap="20px">
                        <Text>Category:</Text>
                        <Box maxW="200px" display="flex">
                          <Image
                            src={
                              props.categories.filter(
                                (val) => val.id == params.category
                              )[0]?.image_url
                            }
                            alt="Picture of the author"
                            width="50px"
                            height="50px"
                          />
                          <Text fontWeight={700} marginLeft={2}>
                            {
                              props.categories.filter(
                                (val) => val.id == params.category
                              )[0]?.category_name
                            }
                          </Text>
                          <Box
                            cursor="pointer"
                            onClick={() => removeParams("category")}
                          >
                            <BsX size="25" />
                          </Box>
                        </Box>
                      </Box>
                    )}
                    {params.label && (
                      <Box display="flex" mb="10px" gap="20px">
                        <Text>Label:</Text>
                        <Box maxW="200px" display="flex">
                          <Text fontWeight={700} marginLeft={2}>
                            {
                              props.labels.filter(
                                (val) => val.id == params.label
                              )[0]?.label_name
                            }
                          </Text>
                          <Box
                            cursor="pointer"
                            onClick={() => removeParams("label")}
                          >
                            <BsX size="25" />
                          </Box>
                        </Box>
                      </Box>
                    )}
                  </Box>
                )}

                <InputGroup
                  maxW="600px"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleParams({ search: valueSearch });
                    }
                  }}
                >
                  <InputLeftElement>
                    <IconButton
                      onClick={() => {
                        handleParams({ search: valueSearch });
                      }}
                      background="transparent"
                    >
                      <BsSearch />
                    </IconButton>
                  </InputLeftElement>
                  <Input
                    placeholder="Search Blog Post"
                    onChange={(e) => {
                      e.preventDefault();
                      setValueSearch(e.target.value);
                    }}
                  />
                </InputGroup>
              </Box>
            </SimpleGrid>
            {/* NOT FOUND LIST BLOG  */}
            {BlogList?.length === 0 && (
              <Box
                textAlign="center"
                w="100%"
                h="500px"
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <Text>no posts yet</Text>
              </Box>
            )}
            <SimpleGrid columns={[1, null, null, 2]} spacing={10}>
              {/* STICKY POST  */}
              {stickyPost()?.map((val) => (
                <NextLink href={`/blog/${val.slug}`} key={val.id}>
                  <Box cursor="pointer">
                    <Box
                      w="100%"
                      height={["358px", "205px", "350px", "350px"]}
                      border="0.5px solid #FFFFFF"
                      borderRadius={20}
                      as="img"
                      objectFit="cover"
                      src={val.image_url}
                    ></Box>
                    <Spacer h={10} />

                    <Text fontSize="4xl" fontWeight="700">
                      {val.title}
                    </Text>
                    <Text>{moment(val.date).format("DD MMM YYYY")}</Text>
                  </Box>
                </NextLink>
              ))}

              {/* FRIST GRID  */}
              <Box>
                <SimpleGrid columns={[1, null, null, 2]} spacing={10}>
                  {firstColum()?.map((val, i) => (
                    <Thumbnail
                      slug={val.slug}
                      key={String(i)}
                      title={val.title}
                      date={moment(val.date).format("DD MMM YYYY")}
                      imageUrl={val.image_url}
                    />
                  ))}
                </SimpleGrid>
              </Box>
            </SimpleGrid>
            {/* Second GRID */}

            <SimpleGrid columns={[1, null, null, 3]} gap={10} mt={20}>
              {listColumn()?.map((val, i) => (
                <GridItem key={i}>
                    <Thumbnail
                      slug={val.slug}
                      key={String(i)}
                      title={val.title}
                      date={moment(val.date).format("DD MMM YYYY")}
                      imageUrl={val.image_url}
                    />
                </GridItem>
              ))}
            </SimpleGrid>
            <Box display="flex" justifyContent="center" py="50px">
              <Pagination
                current={parseInt(params.page)}
                limit={parseInt(params.limit)}
                totalData={totalData}
                maxPageView={3}
                onChengePage={(e) => {
                  handleParams({ page: e });
                }}
              />
            </Box>

            {/* <NextLink href="/?page=2">
              <h1>asdas</h1>
            </NextLink> */}
            <Cateogries
              handleParams={(e) => handleParams(e)}
              categories={props.categories}
              labels={props.labels}
              text={props.text.home}
            />
          </Stack>
        </Stack>
      </PageLayouts>
    </div>
  );
}

export async function getServerSideProps({ req, query }) {
  let limit = 13;
  const page = query?.page ?? 1;

  if (page > 1) {
    limit = 10;
  }
  // const stickyBlog = []
  // const BlogList = [];
  const { lang } = req.cookies;

  const initialLang = await generateLang(lang);
  const respon = await getBlogs({
    type: initialLang.currentLang,
    ...query,
    limit,
    page,
  });
  const responseCat = await getCategorys({
    type: initialLang.currentLang,
  });
  const responseLabel = await getLabels({
    type: initialLang.currentLang,
  });

  const { blogs, total_data } = respon.data;
  return {
    props: {
      ...initialLang,
      params: {
        ...query,
        page,
        limit,
      },
      // stickyBlog,
      BlogList: blogs,
      totalData: total_data,
      categories: responseCat.data,
      labels: responseLabel.data,
    },
  };
}
