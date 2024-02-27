import Navbar from "@/components/shared/Navbar";
import React, { useContext, useState, useEffect } from "react";
import { Container, SlideFade } from "@chakra-ui/react";
import InitialComponent from "@/components/shared/InitialComponent";
import Game from "@/components/game/Game";
import { QuestionContext } from "@/context/QuestionProvider";
import MutiplayerGame from "@/components/game/MutiplayerGame";

const index = () => {
  const { gameScreen, showGameScreen, multiplayerGameScreen, showMultiplayerGameScreen } = useContext(QuestionContext);

  useEffect(() => {
    const checkGame = JSON.parse(sessionStorage.getItem("gameScreen"));
    const checkMultiplayerGame = JSON.parse(sessionStorage.getItem("multiplayerGameScreen"));
    showGameScreen(checkGame);
    showMultiplayerGameScreen(checkMultiplayerGame)
  }, [gameScreen, multiplayerGameScreen]);

  return (
    <SlideFade offsetY="20px" in={true}>
      <Container
        className="main"
        overflow="hidden"
        maxW="100%"
        height="100vh"
        p={5}
      >
        <Navbar />
        {!gameScreen && !multiplayerGameScreen ? (
          <InitialComponent
            gameScreen={gameScreen}
            showGameScreen={showGameScreen}
            showMultiplayerGameScreen={showMultiplayerGameScreen}
          />
        ) : gameScreen && !multiplayerGameScreen ? <Game /> : <MutiplayerGame />}
      </Container>
    </SlideFade>
  );
};

export default index;
