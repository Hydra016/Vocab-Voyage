import React from "react";
import { Box, Avatar, Text, AvatarBadge, Heading } from "@chakra-ui/react";

const MultiplayerSubNav = ({ user, opponent, seconds }) => {
  return (
    <Box
      width="100%"
      display="flex"
      justifyContent="space-between"
    >
      <Box display="flex" flexDirection="column" alignItems="center">
        <Avatar size="lg" name={user.username} src={user.pic}>
          <AvatarBadge boxSize="0.9em" bg="green.500" />
        </Avatar>
        <Heading fontSize={20} className="capitalize" mt={1}>{user.name}</Heading>
      </Box>

      <Heading>{seconds}</Heading>
      <Box display="flex" flexDirection="column" alignItems="center">
        <Avatar size="lg" name={opponent.username} src={opponent.pic}>
          <AvatarBadge boxSize="0.9em" bg="green.500" />
        </Avatar>
        <Heading fontSize={20} className="capitalize" mt={1}>{opponent.name}</Heading>
      </Box>
    </Box>
  );
};

export default MultiplayerSubNav;
