import { Container } from "@chakra-ui/react";
import Navbar from "components/section/Navbar";
import Sidebar from "components/section/Sidebar";
export default function AdminLayout({ text, currentLang, children }) {
  return (
    <div>
      <Navbar currentLang={currentLang} text={text.navbar} />
      <Sidebar>
        <Container maxW="container.xl" as="main" minH="calc(100vh - 80px)">
          {children}
        </Container>
      </Sidebar>
    </div>
  );
}
