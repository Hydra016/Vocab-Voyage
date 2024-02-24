import React, { useState, useEffect } from "react";
import { SlideFade, useToast, Heading, Box, Text } from "@chakra-ui/react";
import axios from "axios";
import Question from "./Question";
import { IoIosHeart } from "react-icons/io";
import WinningScreen from "./WinningScreen";
import LoosingScreen from "./LoosingScreen";

const Game = () => {
  const [questions, setQuestions] = useState([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const toast = useToast();
  const [lives, setLives] = useState(() => {
    const storedLives = JSON.parse(sessionStorage.getItem("currentLives"));
    return storedLives !== null ? storedLives : 5;
  });
  const [showHint, setShowHint] = useState(false);
  const [winningScreen, setWinningScreen] = useState(false);
  const [level, setLevel] = useState("beginner");

  useEffect(() => {
    fetchQuestions();
    const currentQuestion = JSON.parse(
      sessionStorage.getItem("currentQuestion")
    );
    const currentLives = JSON.parse(sessionStorage.getItem("currentLives"));
    currentQuestion && setQuestionIndex(currentQuestion);
    currentLives && setLives(currentLives);
  }, []);

  useEffect(() => {
    JSON.stringify(sessionStorage.setItem("currentQuestion", questionIndex));
    JSON.stringify(sessionStorage.setItem("currentLives", lives));
  }, [questionIndex, lives]);

  useEffect(() => {
      if (questions.length > 0 && questionIndex >= questions.length - 1) {
        setWinningScreen(true);
        // setLevel(questions[questionIndex].level)
      }
  }, [questionIndex, questions.length]);

  const fetchQuestions = async () => {
    try {
      const { data } = await axios.get("/api/questions/getAllQuestions");
      data.sort((a, b) => a.level.localeCompare(b.level));
      setQuestions(data);
    } catch (error) {
      toast({
        title: "error occured",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  useEffect(() => {
    showHint &&
      toast({
        title: questions[questionIndex].hint,
        status: "info",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    setShowHint(false);
  }, [showHint]);

  const checkAnswer = (index, correct) => {
    if (index === parseInt(correct)) {
      setQuestionIndex(questionIndex + 1);
    }
    if (index !== parseInt(correct)) {
      setLives(lives - 1);
      toast({
        title: "try again",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  const renderScreens = () => {
    if (lives === 0) {
      return (
        <LoosingScreen
          setLives={setLives}
          setQuestionIndex={setQuestionIndex}
        />
      );
    }

    if (questions.length > 0 && questionIndex === questions.length) {
      return (
        <WinningScreen
          setQuestionIndex={setQuestionIndex}
          setLives={setLives}
        />
      );
    }

    if (questions.length > 0 && lives !== 0) {
      return (
        <React.Fragment>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={10}
          >
            <Box>
            <Heading fontSize={{ base: 25, md: 40 }}>
              Question {questionIndex + 1}
            </Heading>
            <Text fontSize={{ base: 15, md: 20 }} className="capitalize">Difficulty: {questions[questionIndex].level}</Text>
            </Box>
            <Box display="flex">
              {Array.from({ length: lives }, (_, index) => (
                <IoIosHeart size={25} key={index} fill="red" />
              ))}
            </Box>
          </Box>
          <Question
            questions={questions}
            checkAnswer={checkAnswer}
            questionIndex={questionIndex}
            setShowHint={setShowHint}
          />
        </React.Fragment>
      );
    }
  };

  return (
    <SlideFade offsetY="20px" in={true}>
      <Box
        p={5}
        className={`game-container ${lives === 0 ? "lost" : "normal"}`}
        width="100%"
        height="100vh"
        backgroundColor="#FAF9F6"
      >
        {renderScreens()}
      </Box>
    </SlideFade>
  );
};

export default Game;
