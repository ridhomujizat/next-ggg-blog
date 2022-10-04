import React from "react";
import Head from "next/head";
import NextLink from "next/link";
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
} from "@chakra-ui/react";
import { BsSearch } from "react-icons/bs";
import { getBlogs } from "service/post";
import { getCategorys } from "service/category";
import { getLabels } from "service/labels";
import moment from "moment";

export default function Home(props) {
  const { limit, page, BlogList } = props;

  console.log("current", BlogList);
  const stickyPost = () => {
    let data = [];
    if (page === 1) {
      data = props.BlogList.slice(0, 1);
    }

    return data;
  };

  const firstColum = () => {
    let data = [];
    if (page === 1) {
      data = props.BlogList.slice(1, 5);
    }
    return data;
  };

  const listColumn = () => {
    let data = [];
    if (page === 1) {
      data = props.BlogList.slice(6, data.length + 1);
    }
    return data;
  };

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
              columns={[1, null, 2]}
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
                <InputGroup>
                  <InputRightElement>
                    <BsSearch />
                  </InputRightElement>
                  <Input placeholder="Search Blog Post" />
                </InputGroup>
              </Box>
            </SimpleGrid>
            {/* NOT FOUND LIST BLOG  */}
            {BlogList.length === 0 && (
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
            {console.log(stickyPost())}
            <SimpleGrid columns={[1, null, null, 2]} spacing={10}>
              {/* STICKY POST  */}
              {stickyPost().map((val) => (
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
                  {firstColum().map((val, i) => (
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
            {/* Second GRDI */}

            <SimpleGrid columns={[1, null, null, 4]} gap={10} mt={20}>
              {listColumn().map((o, i) => (
                <GridItem key={i}>
                  <Thumbnail
                    key={String(i)}
                    title="Ikuti Misi Dari Metabank GGG # Rekomendasi"
                    imageUrl="bg.jpg"
                    date={"16 Agu 2022  "}
                  />
                </GridItem>
              ))}
            </SimpleGrid>
            {/* <NextLink href="/?page=2">
              <h1>asdas</h1>
            </NextLink> */}
            <Cateogries categories={props.categories} labels={props.labels} text={props.text.home} />
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
    limit,
    page,
  });
  const responseCat = await getCategorys({
    type: initialLang.currentLang,
  });
  const responseLabel = await getLabels({
    type: initialLang.currentLang,
  });

  return {
    props: {
      ...initialLang,
      page,
      limit,
      // stickyBlog,
      BlogList: respon.data,
      categories: responseCat.data,
      labels: responseLabel.data,
    },
  };
}
