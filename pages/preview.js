import { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";

import { Text, Box, Image, Tab, Tabs, TabList } from "@chakra-ui/react";
import PageLayouts from "layout/PagesLayout";
import generateLang from "lang";
// import { getDetailBySlugBlog, getBlogs } from "service/post";
import styled from "@emotion/styled";
import moment from "moment";
import previewStore from "store/previewStore";

const Output = dynamic(() => import("editorjs-react-renderer"), {
  ssr: false,
});

const BlogStyled = styled(Box)`
  h1 {
    font-size: 25px;
  }
  a {
    color: #40d1d6;
  }
`;

export default function Blog(props) {
  const state = previewStore((state) => state.content);

  const [content, setContent] = useState([]);
  const [type, setType] = useState("en");
  const router = useRouter();

  useEffect(() => {
    setContent(state);
  }, []);

  return (
    <div>
      <Head>
        <title>Priview blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageLayouts currentLang={props.currentLang} text={props.text}>
        <Tabs size="md" variant="enclosed" color="white">
          <TabList>
            <Tab _selected={{ bg: "blueDark" }} onClick={() => setType("en")}>
              EN
            </Tab>
            <Tab _selected={{ bg: "blueDark" }} onClick={() => setType("idn")}>
              IDN
            </Tab>
          </TabList>
        </Tabs>
        <Box display="flex" justifyContent="center" width="100%">
          {content.length > 0 ? (
            <>
              <Box p="4" width={["100%", "90%", "80%"]}>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="flex-start"
                >
                  <Text
                    textTransform="uppercase"
                    fontSize="3xl"
                    fontWeight="bold"
                  >
                    {state[0][`title_${type}`]}
                  </Text>
                </Box>
                {/* ARTICLE INFO  */}
                <Box display="flex" my="10px" gap="20px" alignItems="center">
                  <Box>
                    <Text fontSize="md" fontWeight="bold">
                      Date
                    </Text>
                    <Text color="gray.700" fontSize="sm">
                      {moment(state[0].date).format("DD MMM YYYY")}
                    </Text>
                  </Box>
                  <Box height="40px" borderRight="#fff solid 1px" />
                  <Box>
                    <Text fontSize="md" fontWeight="bold">
                      Author
                    </Text>
                    <Text color="gray.700" fontSize="sm">
                      {state[0].author}
                    </Text>
                  </Box>
                </Box>
                {/* HEADER */}
                <Box my="20px">
                  <Image
                    src={state[0].image_url}
                    alt={state[0][`title_${type}`]}
                    rounded="xl"
                    maxH="500px"
                    width="100%"
                    objectFit="cover"
                    objectPosition="center"
                  />
                </Box>
                {/* CONTENT */}
                <BlogStyled>
                  <Output data={JSON.parse(state[0][`content_${type}`])} />
                </BlogStyled>
              </Box>
            </>
          ) : (
            <Box
              height="200px"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              not found
            </Box>
          )}
        </Box>
      </PageLayouts>
    </div>
  );
}

export async function getServerSideProps({ req, params }) {
  const { lang } = req.cookies;

  const initialLang = generateLang(lang);

  return {
    props: {
      ...initialLang,
    },
  };
}
