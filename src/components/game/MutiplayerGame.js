import React, { useEffect, useContext, useState } from 'react'
import { SlideFade, Box, FormControl, FormLabel, Input, Button } from '@chakra-ui/react'
import io from "socket.io-client";
import axios from 'axios'
import { QuestionContext } from '@/context/QuestionProvider';

const MutiplayerGame = () => {
    const { user } = useContext(QuestionContext);
    const socket = io('http://localhost:5000');
    const [roomId, setRoomId] = useState('')

    useEffect(() => {
        socket.on("connection", () => {
          console.log("Connected to Socket.IO server");
          socket.emit("setup", user);
        });
      
        socket.on("disconnect", () => {
          console.log("Disconnected from Socket.IO server");
        });
      
        // Listen for the "new user joined" event
        socket.on("new user joined", (data) => {
          console.log("New user joined:", data.user);
          // Add any other logic you want to perform when a new user joins
        });
      
        return () => {
          socket.disconnect();
        };
      }, [socket, user]);
      

      const joinRoom = () => {
        socket.emit("join game", { roomId, user })
      }

    return (
        <SlideFade offsetY="20px" in={true}>
          <Box
            px={{ base: 5, md: 100 }}
            py={5}
            className={"game-container normal"}
            width="100%"
            height="100vh"
            backgroundColor="#FAF9F6"
          >
              <Box
                display="flex"
                height="80%"
                justifyContent="center"
                alignItems="center"
              >
                <Box p={10} backgroundColor="#fff">
                <FormControl isRequired>
                <FormLabel>Room Id</FormLabel>
                <Input
                  onChange={(e) => setRoomId(e.target.value)}
                  type="text"
                  placeholder="Room Id"
                />
              </FormControl>
              <Button onClick={joinRoom}>Join</Button>
                </Box>
              </Box>
          </Box>
        </SlideFade>
      );
}

export default MutiplayerGame