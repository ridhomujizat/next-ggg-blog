import { Container } from "@chakra-ui/react";
import Navbar from "components/section/Navbar";
import Sidebar from "components/section/Sidebar";
import Footer from "components/section/Footer";

export default function PageLayouts({ text, currentLang, children }) {
  return (
    <div>
      <Navbar currentLang={currentLang} text={text.navbar} />
      <Container maxW="container.xl" as="main" minH="calc(100vh - 80px)" mb="60px">
        {children}
      </Container>
      <Footer text={text.footer} />
    </div>
  );
}
