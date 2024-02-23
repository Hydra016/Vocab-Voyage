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

const Navbar = () => {
  const { user } = useContext(QuestionContext);
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    sessionStorage.removeItem("gameScreen");
    router.push("/");
  };

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      bg="white"
      w="100%"
      p="5px 10px 5px 10px"
      backgroundColor="#FAF9F6"
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
      <div>
        <Tooltip label={user && user.name} hasArrow placement="bottom-end">
          <Avatar
            cursor="pointer"
            name={user && user.name}
            src={user && user.pic}
            mr={3}
            ml={3}
          />
        </Tooltip>
        <Menu>
          <MenuButton as={Button} rightIcon={<FaChevronDown />} fontSize={{ base: "sm", md: "md" }}>
            {user && user.name}
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
      </div>
    </Box>
  );
};

export default Navbar;
