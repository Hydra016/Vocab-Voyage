import { QuestionContext } from "@/context/QuestionProvider";
import React, { useState, useEffect, useContext } from "react";
import { Box, Spinner } from "@chakra-ui/react";
import MultiplayerSubNav from "./MultiplayerSubNav";
import MultiplayerQuestion from "./MultiplayerQuestion";
import axios from "axios";
import MultiplayerFooter from "./MultiplayerFooter";

const MultiplayerQuestions = ({ socket }) => {
  const { user, setRoom, room } = useContext(QuestionContext);
  const [opponent, setOpponent] = useState();

  // const initialRoom = JSON.parse(localStorage.getItem("room")) || {};
  // const [room, setRoomLocal] = useState(initialRoom);

  const initialSeconds = parseInt(sessionStorage.getItem("countdownSeconds"), 10) || 10;
  const [seconds, setSeconds] = useState(initialSeconds);

  useEffect(() => {
    const countdownInterval = setInterval(() => {
      setSeconds((prevSeconds) => {
        const newSeconds = prevSeconds > 0 ? prevSeconds - 1 : 0;
        localStorage.setItem("countdownSeconds", newSeconds.toString());
        sessionStorage.setItem("countdownSeconds", newSeconds.toString());
        return newSeconds;
      });
    }, 1000);

    return () => clearInterval(countdownInterval);
  }, []);

  useEffect(() => {
    if (seconds === 0) {
      console.log("Countdown complete!");
    }
  }, [seconds]);

  useEffect(() => {
    fetchOpponent();
  }, [room]); 

  const fetchOpponent = async () => {
    const opponentUserId =
      user._id !== room.users.guest ? room.users.guest : room.users.host;

    try {
      const { data } = await axios.post("/api/users/getUser", {
        userId: opponentUserId,
      });
      setOpponent(data);
    } catch (error) {
      console.error("Error fetching opponent:", error);
    }
  };

  return (
    <Box p={5} w="100%">
      {opponent ? (
        <Box display="flex" flexDirection="column" justifyContent="space-between" w="100%" h="83vh"> 
          <MultiplayerSubNav
            user={user}
            opponent={opponent}
            seconds={seconds}
          />
          <MultiplayerQuestion />
          <MultiplayerFooter/>
        </Box>
      ) : (
        <Spinner />
      )}
    </Box>
  );
};

export default MultiplayerQuestions;
