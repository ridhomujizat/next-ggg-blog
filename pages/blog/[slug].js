import Head from "next/head";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";

import { Text, Box, Image } from "@chakra-ui/react";
import PageLayouts from "layout/PagesLayout";
import generateLang from "lang";
import { getDetailBySlugBlog } from "service/post";
import styled from "@emotion/styled";
import moment from "moment";
import Label from "components/LabelCategory";

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
`;

export default function Blog(props) {
  const router = useRouter();
  const { blog } = props;

  const handleToBlog = (value) => {
    router.push({
      pathname: "/",
      query: {
        ...value,
      },
    });
  };
  return (
    <div>
      <Head>
        <title> {blog.title}</title>
        <meta name="description" content={blog.meta_description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageLayouts currentLang={props.currentLang} text={props.text}>
        <Box display="flex" justifyContent="center" width="100%">
          <Box p="4" width={["100%", "90%", "80%"]}>
            <Text textTransform="uppercase" fontSize="3xl" fontWeight="bold">
              {blog.title}
            </Text>
            <Text color="gray.700">
              {blog.author} / {moment(blog.date).format("DD MMM YYYY")}
            </Text>
            <Box my="20px">
              <Image
                src={blog.image_url}
                alt={blog.title}
                rounded="xl"
                maxH="500px"
                width="100%"
                objectFit="cover"
                objectPosition="center"
              />
            </Box>
            <BlogStyled>
              <Output data={JSON.parse(blog.content)} />
            </BlogStyled>
            <Box my="20px">
              <Text mb="10px" fontWeight="bold" fontSize="15px">
                Category
              </Text>
              {console.log(blog)}
              <Label
                onClick={() =>
                  handleToBlog({ category: blog?.category_blog?.id })
                }
                title={blog?.category_blog?.category_name}
                imageUrl={blog?.category_blog?.image_url}
              />
            </Box>
            <Box my="20px">
              <Text mb="10px" fontWeight="bold" fontSize="15px">
                Label
              </Text>
              {blog.array_id_labels.map((val) => (
                <Label
                  key={val.id}
                  title={val?.label_name}
                  onClick={() =>
                    handleToBlog({ label: val?.id })
                  }
                />
              ))}
            </Box>
            <Box my="20px">
              <IconShare text={props.text.home.share} />
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

  // if (respon?.error) {
  //   return {
  //     redirect: {
  //       destination: "/not-found",
  //       permanent: false,
  //     },
  //   };
  // }
  console.log(respon);
  return {
    props: {
      ...initialLang,
      blog: respon.data,
    },
  };
}
