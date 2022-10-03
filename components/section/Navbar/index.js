import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Container, Box, Button, Text, Link } from "@chakra-ui/react";
import Cookies from "js-cookie";
import useAuthStore from "store/authStore";
import generateLang from "lang";

import logo from "assets/logo-ggg.png";
const langList = ["en", "idn"];

export default function Navbar({ currentLang, text }) {
  const router = useRouter();
  // const { isLogin, user, setLogout } = useAuthStore((state) => state);
  const isLogin = useAuthStore.getState().isLogin;
  const user = useAuthStore.getState().user;
  const setLogout = useAuthStore.getState().setLogout;
  // const [auth, setAuth] = useState({ isLogin: isLogin, user: user });

  // useEffect(() => {
  //   setAuth({ isLogin, user });
  // }, []);

  const changeLang = (value) => {
    Cookies.set("lang", value);
    window.location.reload();
  };

  const handleLogout = () => {
    Cookies.remove("token");
    setLogout();
    router.push("/");
  };

  return (
    <Box
      borderBottom="1.5px solid rgba(255, 255, 255, 0.5)"
      marginBottom="10px"
      position={"sticky"}
      top="0"
      zIndex={100}
      background={"#0C0E17"}
    >
      <Container maxW="container.xl">
        <Box as="header" sx={sx.header}>
          <Link href="/">
            <Image
              src={logo}
              alt="Picture of the author"
              width="47px"
              height="37px"
            />
          </Link>

          <Box sx={sx.nav}>
            {isLogin ? (
              <>
                <Text fontWeight="bold">Hi, {user.username}</Text>
                <Button variant="outline" onClick={handleLogout}>
                  {/* {text.logout} */}
                </Button>
              </>
            ) : (
              <>
                <Link href="/login">
                  {/* <Button variant="outline">{text.login}</Button> */}
                </Link>
                <Link href="/register">
                  {/* <Button variant="outline">{text.register}</Button> */}
                </Link>
              </>
            )}

            <Box sx={sx.lang}>
              {langList.map((val, i) => (
                <React.Fragment key={i}>
                  <Text
                    as="b"
                    sx={sx.textLang}
                    key={i}
                    cursor={val !== currentLang ? "pointer" : "default"}
                    color={val === currentLang ? "inherit" : "#363636"}
                    onClick={() => changeLang(val)}
                  >
                    {val}
                  </Text>
                  {i !== langList.length - 1 && <Text>|</Text>}
                </React.Fragment>
              ))}
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export async function getServerSideProps({ req }) {
  const { lang } = req.cookies;
  const initialLang = generateLang(lang);

  return {
    props: {
      ...initialLang,
    },
  };
}

const sx = {
  header: {
    height: "80px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  nav: {
    display: "flex",
    gap: "10px",
    alignItems: "center",
  },
  lang: {
    display: "flex",
    gap: "10px",
    alignItems: "center",
  },
  textLang: {
    textTransform: "uppercase",
  },
};
