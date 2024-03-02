import React, { useEffect, useContext } from 'react'
import { Button, Box } from '@chakra-ui/react'
import { FaArrowRightLong } from "react-icons/fa6";
import { QuestionContext } from '@/context/QuestionProvider';

const MultiplayerFooter = () => {
    const { socket, user, roomCreated, setRoomCreated, room } = useContext(QuestionContext);

    // useEffect(() => {
    //   socket.on("room disconnected", (data) => {
    //     console.log(data);
    //     setRoomCreated(data);
    //   });
    // },  [socket, user])

    const disconnectRoom = () => {
        socket.emit("remove room", user);
        // localStorage.removeItem("roomJoined")
        // localStorage.removeItem("room")
      };
    

  return (
    <Box display="flex" justifyContent="flex-end">
        <Button onClick={disconnectRoom} colorScheme="red" rightIcon={<FaArrowRightLong />}>Leave Room</Button>
    </Box>
  )
}

export default MultiplayerFooter