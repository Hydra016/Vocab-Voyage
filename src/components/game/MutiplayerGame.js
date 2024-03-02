import React, { useEffect, useContext, useState } from "react";
import {
  SlideFade,
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Spinner,
  Text,
  useToast,
} from "@chakra-ui/react";
import io from "socket.io-client";
import { QuestionContext } from "@/context/QuestionProvider";
import MultiplayerQuestions from "./MultiplayerQuestions";

const MutiplayerGame = () => {
  const { user, room, setRoom, socketConnected } = useContext(QuestionContext);
  
  const [roomId, setRoomId] = useState("");
  const [roomCreated, setRoomCreated] = useState(false);
  const [roomJoined, setRoomJoined] = useState(false);
  const toast = useToast();

  return (
    <SlideFade offsetY="20px" in={true}>
      <Box
        // px={{ base: 5, md: 100 }}
        // py={5}
        className={"game-container normal"}
        width="100%"
        height="100vh"
        backgroundColor="#FAF9F6"
      >
        <Box>
          {!roomCreated && !roomJoined ? (
            <Box
              p={10}
              h="80vh"
              display="flex"
              alignItems="center"
              justifyContent="center"
              w="100%"
            >
              <Box p={10} className="multiplayer-box">
                <FormControl isRequired>
                  <FormLabel>Room Id</FormLabel>
                  <Box display="flex">
                    <Input
                      onChange={(e) => setRoomId(e.target.value)}
                      type="text"
                      placeholder="Room Id"
                    />
                    <Button ml={5} px={8}>
                      Join Room
                    </Button>
                    <Button ml={5} px={8} >
                      Create Room
                    </Button>
                  </Box>
                </FormControl>
              </Box>
            </Box>
          ) : roomJoined ? (
            <MultiplayerQuestions />
          ) : (
            <Box
              p={10}
              h="80vh"
              flexDirection="column"
              display="flex"
              alignItems="center"
              justifyContent="center"
              w="100%"
            >
              <Spinner />
              <Text mt={5}>Waiting for opponent</Text>
              <Button mt={5} px={8} >
                Cancel
              </Button>
              <Text mt={5}>Your room ID: {user._id}</Text>
            </Box>
          )}
        </Box>
      </Box>
    </SlideFade>
  );
};

export default MutiplayerGame;
