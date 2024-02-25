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
      <Modal
        size={{ base: "xs", md: "lg" }}
        isOpen={isOpen}
        onClose={onClose}
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Profile</ModalHeader>
          <ModalCloseButton />
          <Box p={{ base: 2, md: 5 }} display="flex" alignItems="center">
            <Avatar
              size={{ base: "lg", md: "xl" }}
              name={user.name}
              src={user.pic}
            >
              <AvatarBadge boxSize="0.8em" bg="green.500" />
            </Avatar>
            <VStack
              divider={<StackDivider borderColor="gray.200" />}
              spacing={1}
              align="stretch"
              ml={5}
            >
              <Box h={{ base: "15px", md: "40px" }}>
                <Text fontSize={{ base: 15, md: 25 }}>{user.name}</Text>
              </Box>
              <Box h={{ base: "15px", md: "40px" }}>
                <Text fontSize={{ base: 15, md: 25 }}>{user.username}</Text>
              </Box>
              <Box h={{ base: "15px", md: "40px" }}>
                <Badge colorScheme="green">Beginner</Badge>
              </Box>
            </VStack>
          </Box>
          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={{ base: 0, md: 3 }}
              onClick={onClose}
            >
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </React.Fragment>
  );
};

export default ProfileModal;
