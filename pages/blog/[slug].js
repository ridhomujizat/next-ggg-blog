import { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import readingTime from "reading-time";

import {
  Text,
  Box,
  Image,
  Button,
  SimpleGrid,
  GridItem,
  IconButton,
} from "@chakra-ui/react";
import PageLayouts from "layout/PagesLayout";
import generateLang from "lang";
import { getDetailBySlugBlog, getBlogs } from "service/post";
import styled from "@emotion/styled";
import moment from "moment";
import Label from "components/LabelCategory";
import {
  BsChevronCompactLeft,
  BsArrowRight,
  BsArrowLeft,
} from "react-icons/bs";
import Thumbnail from "components/Thumbnail";

const Output = dynamic(() => import("editorjs-react-renderer"), {
  ssr: false,
});
const IconShare = dynamic(() => import("../../components/IconShare"), {
  ssr: false,
});
const BlogStyled = styled(Box)`
  h1 {
    font-size: 25px;
  }
  a {
    color: #40d1d6;
  }
  p {
    text-align: justify !important;
  }
  figure {
    max-height: unset !important;
  }
  img {
    max-height: unset !important;
  }
`;

export default function Blog(props) {
  const router = useRouter();
  const { blog, readTime } = props;
  const [page, setPage] = useState(1);
  const [listData, setListData] = useState({ blogs: [], total_data: 0 });

  const handleToBlog = (value) => {
    router.push({
      pathname: "/",
      query: {
        ...value,
      },
    });
  };

  useEffect(() => {
    getBlogData();
  }, [page]);

  const getBlogData = async () => {
    const respon = await getBlogs({
      type: props.currentLang,
      limit: 3,
      page,
    });
    setListData(respon.data);
  };

  return (
    <div>
      <Head>
        <title> {blog.title}</title>
        <meta name="description" content={blog.meta_description} />
        <link rel="icon" href="/logo64.png" />
      </Head>
      <PageLayouts currentLang={props.currentLang} text={props.text}>
        <Box display="flex" justifyContent="center" width="100%">
          <Box p="4" width={["100%", "90%", "80%"]}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="flex-start"
            >
              <Text textTransform="uppercase" fontSize="3xl" fontWeight="bold">
                {blog.title}
              </Text>
              <Button
                minWidth="80px"
                rounded="20px"
                variant="outline"
                leftIcon={<BsChevronCompactLeft />}
                onClick={() => {
                  router.push("/");
                }}
              >
                Back
              </Button>
            </Box>
            {/* ARTICLE INFO-  */}
            <Box display="flex" my="10px" gap="20px" alignItems="center">
              <Box>
                <Text fontSize="md" fontWeight="bold">
                  Date
                </Text>
                <Text color="gray.700" fontSize="sm">
                  {moment(blog.date).format("DD MMM YYYY")}
                </Text>
              </Box>
              <Box height="40px" borderRight="#fff solid 1px" />
              <Box>
                <Text fontSize="md" fontWeight="bold">
                  Author
                </Text>
                <Text color="gray.700" fontSize="sm">
                  {blog?.author_detail?.fullname}
                </Text>
              </Box>
              <Box height="40px" borderRight="#fff solid 1px" />
              <Box>
                <Text fontSize="md" fontWeight="bold">
                  Read Time
                </Text>
                <Text color="gray.700" fontSize="sm">
                  {readTime}
                </Text>
              </Box>
            </Box>
            {/* HEADER */}
            <Box my="50px">
              <Image
                src={blog.image_url}
                alt={blog.title}
                rounded="xl"
                maxH="500px"
                width="100%"
                objectFit="cover"
                objectPosition="right top"
              />
            </Box>
            {/* CONTENT */}
            <BlogStyled>
              <Output data={JSON.parse(blog.content)} />
            </BlogStyled>
            {/* <Box my="20px">
              <Text mb="10px" fontWeight="bold" fontSize="15px">
                Category
              </Text>
              <Label
                onClick={() =>
                  handleToBlog({ category: blog?.category_blog?.id })
                }
                title={blog?.category_blog?.category_name}
                imageUrl={blog?.category_blog?.image_url}
              />
            </Box> */}
            {/* ICON SHARE  */}
            <Box my="20px">
              <IconShare text={props.text.home.share} />
            </Box>
            {/* LIST NEW ARTICLES  */}
            <Box my="20px">
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                my="20px"
              >
                <Text mb="10px" fontWeight="bold" fontSize="20px">
                  {props.text.home.newArticles}
                </Text>
                <Box
                  display="flex"
                  gap="10px"
                  flexDirection={["column", "row"]}
                  alignItems="center"
                >
                  <Button
                    minWidth="80px"
                    rounded="20px"
                    variant="outline"
                    onClick={() => {
                      router.push("/");
                    }}
                  >
                    Explore
                  </Button>
                  <Box display="flex" gap="7px">
                    <IconButton
                      size="sm"
                      aria-label="Search database"
                      icon={<BsArrowLeft />}
                      // colorScheme="white"
                      color="black"
                      bgColor="#D9D9D9"
                      rounded="full"
                      colorScheme="white"
                      disabled={1 === page}
                      onClick={() => {
                        setPage(page - 1);
                      }}
                    />
                    <IconButton
                      size="sm"
                      aria-label="Search database"
                      icon={<BsArrowRight />}
                      // colorScheme="white"
                      color="black"
                      bgColor="#D9D9D9"
                      rounded="full"
                      colorScheme="white"
                      disabled={page === ~~(listData.total_data / 3) + 1}
                      onClick={() => {
                        setPage(page + 1);
                      }}
                    />
                  </Box>
                </Box>
              </Box>
              <SimpleGrid columns={[1, null, 3, 3]} gap={10} mt={2}>
                {listData.blogs?.map((val, i) => (
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
            </Box>
          </Box>
        </Box>
      </PageLayouts>
    </div>
  );
}

export async function getServerSideProps({ req, params }) {
  const { lang } = req.cookies;
  const { slug } = params;

  const initialLang = generateLang(lang);
  const respon = await getDetailBySlugBlog({
    id: slug,
    type: initialLang.currentLang,
  });

  if (respon?.error) {
    return {
      redirect: {
        destination: "/not-found",
        permanent: false,
      },
    };
  }

  const readTime = readingTime(respon.data?.content ?? "", { wordsPerMinute: 500 });

  return {
    props: {
      ...initialLang,
      blog: respon.data,
      readTime: readTime.text,
    },
  };
}
