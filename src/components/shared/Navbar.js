import React, { useEffect } from "react";
import {
  Box,
  Tooltip,
  Button,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Avatar,
  MenuDivider,
} from "@chakra-ui/react";
import { FaChevronDown } from "react-icons/fa";
import { useContext } from "react";
import { QuestionContext } from "@/context/QuestionProvider";
import ProfileModal from "./Profile";
import { useRouter } from "next/router";
import { FiMenu } from "react-icons/fi";
import { useMobileDetection } from "@/hooks/useMobileDetection";

const Navbar = () => {
  const { user } = useContext(QuestionContext);
  const isMobile = useMobileDetection();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    sessionStorage.removeItem("gameScreen");
    sessionStorage.removeItem("currentQuestion");
    router.push("/");
  };

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      bg="white"
      w="100%"
      px={{ base: 0, md: 8 }}
      py={{ base: 0, md: 3 }}
      borderRadius="10px"
      mb={{ base: 5, md: 0 }}
    >
      <Box cursor="pointer" display="flex" alignItems="center">
        <Avatar
          onClick={() => router.push("/game")}
          name="Dan Abrahmov"
          src="/paris.png"
        />
        <Text ml={3} fontSize={{ base: "sm", md: "md" }}>
          Vocab Voyage
        </Text>
      </Box>
      <Box display="flex" alignItems="center">
        <Tooltip label={user && user.name} hasArrow placement="bottom-end">
          <Avatar
            cursor="pointer"
            name={user && user.name}
            src={user && user.pic}
            mr={3}
            ml={3}
            display={{ base: "none", md: "block" }}
          />
        </Tooltip>
        <Menu>
          <MenuButton
            as={Button}
            rightIcon={isMobile ? null : <FaChevronDown />}
          >
            {isMobile ? (
              <FiMenu />
            ) : (
              user && (
                <Text fontSize={{ base: "sm", md: "md" }}>{user.name}</Text>
              )
            )}
          </MenuButton>
          <MenuList>
            {user && user.isAdmin && (
              <React.Fragment>
                <MenuItem onClick={() => router.push("/game/Admin")}>
                  Admin
                </MenuItem>
                <MenuDivider />
                <MenuItem onClick={() => router.push("/game/Questions")}>
                  Questions
                </MenuItem>
                <MenuDivider />
              </React.Fragment>
            )}
            {user && (
              <ProfileModal user={user && user}>
                <MenuItem>My Profile</MenuItem>
              </ProfileModal>
            )}
            <MenuDivider />
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </MenuList>
        </Menu>
      </Box>
    </Box>
  );
};

export default Navbar;
