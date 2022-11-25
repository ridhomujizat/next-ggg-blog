import React, { useState, useEffect } from "react";
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
import useAuthStore from "store/authStore";

const LinkItems = [
  // { name: "Dashboard", icon: FiHome, link: "dashboard" },
  {
    name: "Profile",
    icon: FiTrendingUp,
    link: "/profile",
    privilege: ["Admin", "SuperAdmin", "User"],
  },
  {
    name: "Post",
    icon: FiTrendingUp,
    link: "/admin/post",
    privilege: ["Admin", "SuperAdmin"],
  },
  {
    name: "Category",
    icon: FiCompass,
    link: "/admin/categorys",
    privilege: ["Admin", "SuperAdmin"],
  },
  {
    name: "Labels",
    icon: FiCompass,
    link: "/admin/labels",
    privilege: ["Admin", "SuperAdmin"],
  },
  {
    name: "User Management",
    icon: FiCompass,
    link: "/admin/users",
    privilege: ["SuperAdmin"],
  },
  // { name: "Settings", icon: FiSettings, link: "setting" },
];

export default function Sidebar({ children }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isLogin, user, role } = useAuthStore((state) => state);
  const [auth, setAuth] = useState({ isLogin: false, user: null, role: null });

  useEffect(() => {
    setAuth({ isLogin, user, role });
  }, []);

  return (
    <Box minH="100vh" background="#0C0E17">
      <SidebarContent
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
        auth={auth}
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
          <SidebarContent onClose={onClose} auth={auth} />
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

const SidebarContent = ({ onClose, auth, ...rest }) => {
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
      {LinkItems.filter((val) =>
        val.privilege.includes(auth?.role?.role_name)
      ).map((link) => (
        <NavItem key={link.name} icon={link.icon} link={link.link}>
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

const NavItem = ({ icon, children, link, ...rest }) => {
  const router = useRouter();

  return (
    <Link href={link} style={{ textDecoration: "none" }}>
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
          background={link === router.pathname ? "#1C2975" : ""}
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
