import React, { useState, useEffect, useContext } from "react";
import {
  Container,
  useToast,
  Button,
  SlideFade,
  Heading,
  Box,
} from "@chakra-ui/react";
import Typewriter from "typewriter-effect";
import axios from "axios";

import { QuestionContext } from "@/context/QuestionProvider";

const InitialComponent = ({ showMultiplayerGameScreen, showGameScreen }) => {
  const [introPlayed, setIntroPlayed] = useState(false);
  const [newGame, setNewGame] = useState(false);
  const { user, setUser } = useContext(QuestionContext);
  const toast = useToast();

  useEffect(() => {
    user && completeOnBoarding();
  }, [introPlayed]);

  useEffect(() => {
    if (user && user.isOnBoarded) setNewGame(true);
  }, [user && user.isOnBoarded]);

  const completeOnBoarding = async () => {
    try {
      const { data } = await axios.put("api/users/onboarding", {
        userId: user._id,
        isOnBoarded: true,
      });

      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      const updatedUserInfo = { ...userInfo, isOnBoarded: true };
      localStorage.setItem("userInfo", JSON.stringify(updatedUserInfo));
      setUser(updatedUserInfo);
    } catch (error) {
      console.error("Error completing onboarding:", error);
      toast({
        title: "Error Occured!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  const setGameScreen = (gameScreen) => {
    
    if(gameScreen === "single") {
      showGameScreen(true);
      JSON.stringify(sessionStorage.setItem("gameScreen", true));
    } else {
      showMultiplayerGameScreen(true);
      JSON.stringify(sessionStorage.setItem("multiplayerGameScreen", true));
    }
  };

  return (
    <Container maxW="100%" height="100%" mt={50} fontSize={30}>
      {user && !user.isOnBoarded && (
        <Box display="flex" justifyContent="center" maxW="100%" height="100%">
          <Typewriter
            onInit={(typewriter) => {
              typewriter
                .changeDelay(13)
                .typeString("Bonjour")
                .pauseFor(500)
                .deleteChars(10)
                .pauseFor(500)
                .typeString("welcome to Vocab Voyage")
                .pauseFor(500)
                .deleteChars(23)
                .typeString(
                  "the perfect place to improve your <b>compétences en français</b>"
                )
                .pauseFor(500)
                .deleteChars(58)
                .typeString("best of luck")
                .pauseFor(500)
                .deleteChars(12)
                .start()
                .callFunction(() => setIntroPlayed(true));
            }}
          />
        </Box>
      )}
      {newGame && (
        <SlideFade offsetY="20px" in={true}>
          <Container maxW="100%" display="flex" justifyContent="center">
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              mt={{ base: 50, md: 100 }}
            >
              <Heading fontSize={{ base: 40 }} mb={10} as="h1">
                Vocab Voyage <span style={{ fontSize: "10px" }}>V1.0</span>
              </Heading>
              <Heading fontSize={{ base: 20, md: 25 }} mb={3}>High Score: {user.HighScore}</Heading>
              <Box display="flex" flexDirection="column">
                <Button
                  onClick={() => setGameScreen("single")}
                  px={20}
                  py={8}
                  fontSize={25}
                  mb={3}
                  colorScheme="blue"
                >
                  Single Player
                </Button>
                <Button
                  onClick={() => setGameScreen("multi")}
                  px={20}
                  py={8}
                  fontSize={25}
                  colorScheme="blue"
                >
                  Multi Player
                </Button>
              </Box>
            </Box>
          </Container>
        </SlideFade>
      )}
    </Container>
  );
};

export default InitialComponent;
