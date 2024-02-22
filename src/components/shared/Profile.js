import React from "react";
import {
  useDisclosure,
  IconButton,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Button,
  Text,
  Box,
  Badge,
  Avatar,
  AvatarBadge,
  VStack,
  StackDivider,
} from "@chakra-ui/react";
import { FaEye } from "react-icons/fa";

const ProfileModal = ({ user, children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <React.Fragment>
      {children ? (
        <span onClick={onOpen}>{children}</span>
      ) : (
        <IconButton display="flex" icon={<FaEye />} onClick={onOpen} />
      )}
      <Modal size="lg" isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Profile</ModalHeader>
          <ModalCloseButton />
          <Box p={5} display="flex" alignItems="center">
            <Avatar size="xl" name={user.name} src={user.pic}>
              <AvatarBadge boxSize="0.8em" bg="green.500" />
            </Avatar>
            <VStack
              divider={<StackDivider borderColor="gray.200" />}
              spacing={1}
              align="stretch"
              ml={5}
            >
              <Box h="40px">
                <Text fontSize={25}>{user.name}</Text>
              </Box>
              <Box h="40px">
                <Text fontSize={25}>{user.username}</Text>
              </Box>
              <Box h="40px">
                <Badge colorScheme="green">Beginner</Badge>
              </Box>
            </VStack>
          </Box>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </React.Fragment>
  );
};

export default ProfileModal;
