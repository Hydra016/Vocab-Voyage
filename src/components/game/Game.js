import React, { useState, useContext, useEffect } from "react";
import {
  SlideFade,
  useToast,
  Heading,
  Stack,
  Box,
  Button,
  Grid,
} from "@chakra-ui/react";
import axios from "axios";
import { QuestionContext } from "@/context/QuestionProvider";
import Question from "./Question";
import { IoIosHeart } from "react-icons/io";
import WinningScreen from "./WinningScreen";
import LoosingScreen from "./LoosingScreen";

const Game = () => {
  const { user } = useContext(QuestionContext);
  const [questions, setQuestions] = useState([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const toast = useToast();
  const [lives, setLives] = useState(5);
  const [showHint, setShowHint] = useState(false);
  const [winningScreen, setWinningScreen] = useState(false);

  useEffect(() => {
    fetchQuestions();
    const currentQuestion = JSON.parse(sessionStorage.getItem("currentQuestion"))
    currentQuestion && setQuestionIndex(currentQuestion)
  }, []);

  useEffect(() => {
    JSON.stringify(sessionStorage.setItem("currentQuestion", questionIndex))
  }, [questionIndex]);

  useEffect(() => {
    if (questions.length > 0) {
      if (questionIndex >= questions.length - 1) {
        console.log(questionIndex, questions.length);
        setWinningScreen(true);
      }
    }
  }, [questionIndex, questions.length]);

  const fetchQuestions = async () => {
    try {
      const { data } = await axios.get("/api/questions/getAllQuestions");
      data.sort((a, b) => a.level.localeCompare(b.level));
      setQuestions(data);
    } catch (error) {
      console.error("Error fetching questions:", error);
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

  return (
    <SlideFade offsetY="20px" in={true}>
      <Box
        px={100}
        py={10}
        className={`game-container ${lives === 0 ? "lost" : "normal"}`}
        width="100%"
        height="100vh"
        backgroundColor="#FAF9F6"
      >
        {questionIndex < questions.length && lives > 0 ? (
          <React.Fragment>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Heading mt={50}>Question {questionIndex + 1}</Heading>
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
        ) : winningScreen ? (
          <WinningScreen setQuestionIndex={setQuestionIndex} />
        ) : (
          <LoosingScreen setLives={setLives} setQuestionIndex={setQuestionIndex} />
        )}
      </Box>
    </SlideFade>
  );
};

export default Game;
