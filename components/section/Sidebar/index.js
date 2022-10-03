import React, { ReactNode } from "react";
import {
  IconButton,
  Box,
  CloseButton,
  Flex,
  Icon,
  useColorModeValue,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiStar,
  FiSettings,
  FiMenu,
} from "react-icons/fi";
import Link from "next/link";
import { useRouter } from "next/router";

const LinkItems = [
  // { name: "Dashboard", icon: FiHome, link: "dashboard" },
  { name: "Post", icon: FiTrendingUp, link: "post" },
  { name: "Cateogry", icon: FiCompass, link: "categorys" },
  { name: "Labels", icon: FiCompass, link: "labels" },
  { name: "users", icon: FiCompass, link: "user" },
  // { name: "Settings", icon: FiSettings, link: "setting" },
];

export default function Sidebar({ children }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box minH="100vh" background="#0C0E17">
      <SidebarContent
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav display={{ base: "flex", md: "none" }} onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {children}
      </Box>
    </Box>
  );
}

const SidebarContent = ({ onClose, ...rest }) => {
  return (
    <Box
      bg={"#0C0E17"}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex
        h="20"
        alignItems="center"
        mx="8"
        justifyContent="space-between"
        display={["flex", "flex", "none"]}
      >
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem key={link.name} icon={link.icon} link={link.link}>
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

const NavItem = ({ icon, children, link, ...rest }) => {
  const router = useRouter();

  const AtferSlash = (string) => {
    return string.split("/")[2];
  };


  return (
    <Link href={`/admin/${link}`} style={{ textDecoration: "none" }}>
      <a>
        <Flex
          align="center"
          justify="center"
          p="2"
          mx="4"
          my="10"
          borderRadius="xl"
          role="group"
          cursor="pointer"
          background={link === AtferSlash(`${router.pathname}`) ? "#1C2975" : ""}
          border="1px"
          borderColor="white"
          _hover={{
            bg: "cyan.400",
            color: "white",
          }}
          {...rest}
        >
          {children}
        </Flex>
      </a>
    </Link>
  );
};

const MobileNav = ({ onOpen, ...rest }) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 24 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent="flex-start"
      {...rest}
    >
      <IconButton
        variant="outline"
        onClick={onOpen}
        aria-label="open menu"
        icon={<FiMenu />}
      />
    </Flex>
  );
};
